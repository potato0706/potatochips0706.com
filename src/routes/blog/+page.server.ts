import { join } from 'node:path';
import { Database } from 'bun:sqlite';
import type { SQLQueryBindings } from 'bun:sqlite';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';

export async function load() {
	const database = new Database(join(process.cwd(), 'data.db'));

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
