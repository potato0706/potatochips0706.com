import { loadPost } from '$lib/posts.js';

export async function load({ params }) {
	return await loadPost(params.slug);
}
