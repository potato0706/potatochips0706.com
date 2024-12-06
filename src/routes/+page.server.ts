import Database from 'bun:sqlite';
import { marked } from 'marked';
import { join } from 'node:path';

export async function load() {
	const database = new Database(join(process.cwd(), 'data.db'));

	const data = database.query('SELECT "about-text" FROM Settings LIMIT 1').get() as any;
	const text = await marked.parse(data['about-text'], { breaks: true });

	return {
		text
	};
}
