export default {
  plugins: [],
    theme: {
      extend: {},
    },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  purge: ["./index.html",'./src/**/*.{svelte,js,ts}'], //for unused css
  variants: {
    extend: {},
  },
  darkmode: false, // or 'media' or 'class'
}