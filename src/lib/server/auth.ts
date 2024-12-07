import jwt from 'jsonwebtoken';
import { database } from '$lib/constants';

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
