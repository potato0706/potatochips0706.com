import type { Post, PostMetadata } from '$lib/types/post';
import { error } from '@sveltejs/kit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';
import { compile } from 'mdsvex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export async function load() {
	try {
		// Navigate up to the project root and then into src/posts
		const postsPath = join(__dirname, '..', '..', '..', 'src', 'posts');

		if (!fs.existsSync(postsPath)) {
			console.error(`Posts directory not found at: ${postsPath}`);
			return { posts: [] };
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
	} catch (e) {
		console.error(e);
		throw error(500, 'Could not load blog posts');
	}
}
