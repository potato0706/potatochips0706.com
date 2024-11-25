import { join } from 'node:path';
import { Database } from 'bun:sqlite';
import type { SQLQueryBindings } from 'bun:sqlite';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';

const database = new Database(join(process.cwd(), 'data.db'));
database.run(`CREATE TABLE IF NOT EXISTS Posts (
				slug TEXT PRIMARY KEY,
				title TEXT NOT NULL,
				date DATETIME NOT NULL,
				excerpt TEXT,
				content TEXT NOT NULL
			)`);

export async function getPosts() {
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

export async function loadPost(slug: string) {
	try {
		const posts = database
			.query<Post, SQLQueryBindings | SQLQueryBindings[]>('SELECT * FROM Posts WHERE slug = ?')
			.get(slug);

		if (!posts) throw error(404, 'Post not found');

		const post: Post = {
			slug,
			title: posts.title,
			date: posts.date,
			excerpt: posts.excerpt,
			content: posts.content
		};

		return { post };
	} catch (e: any) {
		console.error(e);
		throw error(500, 'Could not load blog post');
	}
}
