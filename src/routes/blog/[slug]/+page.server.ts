import { loadPost } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await loadPost(params.slug);

	if (!post) {
		throw error(404, {
			message: 'Post not found'
		});
	}

	return {
		post
	};
}
