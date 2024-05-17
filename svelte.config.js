import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// https://docs.netlify.com/frameworks/sveltekit/#edge-functions
			edge: true,
			// https://docs.netlify.com/frameworks/sveltekit/#split-functions
			split: false
		})
	}
};

export default config;
