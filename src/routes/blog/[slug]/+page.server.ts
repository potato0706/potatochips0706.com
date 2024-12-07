import type { SQLQueryBindings } from 'bun:sqlite';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';
import { marked } from 'marked';
import { database } from '$lib/constants';

export async function load({ params }) {
	try {
		const post = database
			.query<Post, SQLQueryBindings | SQLQueryBindings[]>('SELECT * FROM Posts WHERE slug = ?')
			.get(params.slug);

		if (!post) {
			throw error(404, {
				message: 'Post not found'
			});
		}

		const content = marked.parse(post.content);

		return {
			...post,
			content
		};
	} catch (e: any) {
		if (e.status) {
			throw e;
		}
		console.error(e);
		throw error(500, 'Could not load blog post');
	}
}
