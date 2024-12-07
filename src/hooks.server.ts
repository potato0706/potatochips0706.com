import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import { database } from '$lib/constants';

database.run(`CREATE TABLE IF NOT EXISTS "Posts" (
	"slug" TEXT PRIMARY KEY,
	"title" TEXT NOT NULL,
	"date" DATETIME NOT NULL,
	"excerpt" TEXT,
	"content" TEXT NOT NULL
	"category" TEXT NOT NULL
)`);
database.run(`CREATE TABLE IF NOT EXISTS "Admin" (
	"username" TEXT PRIMARY KEY,
	"password" TEXT NOT NULL
)`);
database.run(`CREATE TABLE IF NOT EXISTS "Settings" (
	"key"	INTEGER,
	"about-text"	BLOB NOT NULL,
	PRIMARY KEY(key AUTOINCREMENT)
);`);
database.run(`CREATE TABLE IF NOT EXISTS "Admin" (
	"username"	TEXT,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("username")
);`);
database.run(`INSERT INTO Admin (username, password) VALUES ("admin", 'admin');`);
database.run(
	`INSERT INTO Settings ("about-text") VALUES ("This is the default about text of your page, go to /admin to change it!");`
);

export async function handle({ event, resolve }) {
	const protectedPaths = ['/admin', '/admin/*', '/api/admin/*'];
	const isProtected = protectedPaths.some((path) => event.url.pathname.startsWith(path));

	if (!isProtected) return await resolve(event);

	const token = event.cookies.get('token');

	if (!token) throw redirect(303, '/login');

	const user = verifyToken(token);

	if (!user) {
		event.cookies.delete('token', { path: '/' });
		throw redirect(303, '/login');
	}

	event.locals.user = user;
	return await resolve(event);
}
