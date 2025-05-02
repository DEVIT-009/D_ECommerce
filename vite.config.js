import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],
  server: {
    port: 3000,
    proxy: {
      "/product": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/product/, ""),
      },
      "/user": {
        target: "http://localhost:8001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
