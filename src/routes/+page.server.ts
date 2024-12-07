import { marked } from 'marked';
import { join } from 'node:path';
import { database } from '$lib/constants';

export async function load() {
	const data = database.query('SELECT "about-text" FROM Settings LIMIT 1').get() as any;
	const text = await marked.parse(data['about-text'], { breaks: true });

	return {
		text
	};
}
