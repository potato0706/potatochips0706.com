import fs from 'node:fs';
import { join } from 'node:path';
import { compile } from 'mdsvex';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';

function isPostMetadata(obj: any) {
	return (
		typeof obj === 'object' &&
		typeof obj.title === 'string' &&
		typeof obj.date === 'string' &&
		(obj.excerpt === undefined || typeof obj.excerpt === 'string')
	);
}

function isCompileResult(obj: Object) {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'code' in obj &&
		(!('data' in obj) || typeof obj.data === 'object')
	);
}

export async function getPosts() {
	try {
		const postsPath = join(process.cwd(), 'src', 'posts');

		if (!fs.existsSync(postsPath)) {
			throw error(500, 'Posts storage directory not found');
		}

		const files = fs.readdirSync(postsPath);

		const posts = await Promise.all(
			files
				.filter((file) => file.endsWith('.svx'))
				.map(async (file) => {
					const filePath = join(postsPath, file);
					const content = fs.readFileSync(filePath, 'utf-8');
					const slug = file.replace('.svx', '');

					const compiled = await compile(content);

					if (!compiled || !isCompileResult(compiled)) {
						throw new Error(`Failed to compile post: ${slug}`);
					}

					const metadata = compiled.data?.fm || {};

					if (!isPostMetadata(metadata)) {
						throw new Error(`Invalid post metadata: ${slug}`);
					}

					const post: Post = {
						slug,
						title: metadata.title,
						date: metadata.date,
						excerpt: metadata.excerpt,
						content: compiled.code
					};

					return post;
				})
		);

		return {
			posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		};
	} catch (e: any) {
		console.error(e);
		throw error(500, 'Could not load blog posts');
	}
}

export async function loadPost(slug: string) {
	try {
		const postsPath = join(process.cwd(), 'src', 'posts');
		const filePath = join(postsPath, `${slug}.svx`);

		if (!fs.existsSync(filePath)) {
			throw error(404, 'Post not found');
		}

		const content = fs.readFileSync(filePath, 'utf-8');
		const compiled = await compile(content);

		if (!compiled || !isCompileResult(compiled)) {
			throw new Error(`Failed to compile post: ${slug}`);
		}

		const metadata = compiled.data?.fm || {};

		if (!isPostMetadata(metadata)) {
			throw new Error(`Invalid post metadata: ${slug}`);
		}

		const post: Post = {
			slug,
			title: metadata.title,
			date: metadata.date,
			excerpt: metadata.excerpt,
			content: compiled.code
		};

		return { post };
	} catch (e: any) {
		if (e.status === 404) throw e;
		console.error(e);
		throw error(500, 'Could not load blog post');
	}
}
