import type { Post, PostMetadata } from '$lib/types/post';
import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'mdsvex';
import type { CompileResult } from 'mdsvex';

function isPostMetadata(obj: any): obj is PostMetadata {
	return (
		typeof obj === 'object' &&
		typeof obj.title === 'string' &&
		typeof obj.date === 'string' &&
		(obj.excerpt === undefined || typeof obj.excerpt === 'string')
	);
}

function isCompileResult(obj: any): obj is CompileResult {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'code' in obj &&
		(!('data' in obj) || typeof obj.data === 'object')
	);
}

export async function load() {
	try {
		const postsPath = path.join(process.cwd(), 'src', 'posts');
		const files = fs.readdirSync(postsPath);

		const posts = await Promise.all(
			files
				.filter((file) => file.endsWith('.svx'))
				.map(async (file) => {
					const filePath = path.join(postsPath, file);
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
	} catch (e) {
		console.error(e);
		throw error(500, 'Could not load blog posts');
	}
}
