import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { codecovSvelteKitPlugin } from '@codecov/sveltekit-plugin';

export default defineConfig({
	plugins: [
		sveltekit(),
		codecovSvelteKitPlugin({
			enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			bundleName: 'yapt',
			uploadToken: process.env.CODECOV_TOKEN
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			reporter: ['cobertura']
		},
		reporters: ['default', 'junit'],
		outputFile: {
			junit: './junit.xml'
		}
	}
});
