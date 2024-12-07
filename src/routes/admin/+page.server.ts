import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Database } from 'bun:sqlite';
import { join } from 'node:path';

const database = new Database(join(process.cwd(), 'data.db'));

export const actions: Actions = {
	updateAbout: async ({ request }) => {
		const formData = await request.formData();
		const aboutTextContent = formData.get('about-text') as string;

		if (!aboutTextContent) {
			return fail(400, { error: 'About text is required' });
		}

		database.query('UPDATE Settings SET "about-text" = ? WHERE key = 1').run(aboutTextContent);

		return { success: true };
	},

	createPost: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const category = formData.get('category') as string;
		const content = formData.get('content') as string;
		const excerpt = formData.get('excerpt') as string;

		if (!title || !slug || !category || !content) {
			return fail(400, { error: 'All fields are required' });
		}

		database
			.query(
				'INSERT INTO Posts (title, slug, category, content, excerpt, date) VALUES (?, ?, ?, ?, ?, DATETIME("now"))'
			)
			.run(title, slug, category, content, excerpt);

		return { success: true };
	}
};