import { join } from 'node:path';
import { Database } from 'bun:sqlite';
import type { SQLQueryBindings } from 'bun:sqlite';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';
import { marked } from 'marked';

const database = new Database(join(process.cwd(), 'data.db'));
database.run(`CREATE TABLE IF NOT EXISTS Posts (
				slug TEXT PRIMARY KEY,
				title TEXT NOT NULL,
				date DATETIME NOT NULL,
				excerpt TEXT,
				content TEXT NOT NULL
			)`);
database.run(`CREATE TABLE IF NOT EXISTS Admin (
				username TEXT PRIMARY KEY,
				password TEXT NOT NULL
			)`);
database.run(`CREATE TABLE IF NOT EXISTS "Settings" (
				key	INTEGER,
				"about-text"	BLOB NOT NULL,
				PRIMARY KEY(key AUTOINCREMENT)
			);`);
database.run(`CREATE TABLE IF NOT EXISTS "Admin" (
				username	TEXT,
				password	TEXT NOT NULL,
				PRIMARY KEY("username")
);`);

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
		const post = database
			.query<Post, SQLQueryBindings | SQLQueryBindings[]>('SELECT * FROM Posts WHERE slug = ?')
			.get(slug);

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
