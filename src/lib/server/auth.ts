import { join } from 'node:path';
import Database from 'bun:sqlite';
import jwt from 'jsonwebtoken';

const database = new Database(join(process.cwd(), 'data.db'));

export function validateCredentials(username: string, password: string) {
	const user = database
		.query('SELECT * FROM Admin WHERE username = $username AND password = $password')
		.get({ $username: username, $password: password });

	return user ? true : false;
}

export function createToken(username: string) {
	return jwt.sign({ username }, process.env.JWT_SECRET!, {
		expiresIn: '7d'
	});
}

export function verifyToken(token: string) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!) as { username: string };
	} catch {
		return null;
	}
}
