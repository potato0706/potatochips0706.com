import { getPosts } from '$lib/server/database';

export async function load() {
	return await getPosts();
}
