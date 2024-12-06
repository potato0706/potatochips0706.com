import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	const protectedPaths = ['/admin', '/admin/*', '/api/admin', '/api/admin/*'];
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
