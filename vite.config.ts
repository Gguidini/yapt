import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  resolve: {
    conditions: mode === "test" ? ["browser"] : [],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.js"],
  },
}));
