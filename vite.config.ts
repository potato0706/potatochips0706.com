import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			external: ['bun:sqlite']
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern'
			}
		}
	}
});
