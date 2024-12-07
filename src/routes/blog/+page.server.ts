import type { SQLQueryBindings } from 'bun:sqlite';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';
import { database } from '$lib/constants';

export async function load() {
	try {
		const posts = database
			.query<Post, SQLQueryBindings | SQLQueryBindings[]>('SELECT * FROM Posts')
			.all();

		return {
			posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		};
	} catch (err: any) {
		console.error(err);
		throw error(500, 'Could not load blog posts');
	}
}
