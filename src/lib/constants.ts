import { join } from 'node:path';
import Database from 'bun:sqlite';

export const database = new Database(join(process.cwd(), 'database.db'));
