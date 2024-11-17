import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'custom-css-tree-resolver',
			resolveId(id) {
				if (id === 'css-tree') {
					return require.resolve('./node_modules/css-tree/dist/csstree.esm.js');
				}
			}
		}
	]
});
