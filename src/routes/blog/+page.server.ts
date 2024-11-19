import { getPosts } from '$lib/posts';

export async function load() {
	return await getPosts();
}
