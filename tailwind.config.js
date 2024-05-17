import { createThemes } from 'tw-colors';

export default {
	plugins: [
		createThemes({
			dune: {
				primary: {
					light: '#FFFBDA',
					DEFAULT: '#FFFBDA',
					dark: '#FFEC9E'
				},
				secondary: {
					light: '#FFBB70',
					DEFAULT: '#ED9455',
					dark: '#de6a18'
				}
			},
			green_tomato: {
				primary: {
					light: '#FEFDED',
					DEFAULT: '#FEFDED',
					dark: '#C6EBC5'
				},
				secondary: {
					light: '#FA7070',
					DEFAULT: '#FA7070',
					dark: '#FA7070'
				}
			}
		})
	],
	theme: {
		extend: {}
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	purge: ['./index.html', './src/**/*.{svelte,js,ts}'], //for unused css
	variants: {
		extend: {}
	},
	darkmode: false // or 'media' or 'class'
};
