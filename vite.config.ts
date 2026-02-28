import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),

  base: "/", // ✅ Important for production asset paths

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist/public"), // ✅ Absolute path (safer in production)
    emptyOutDir: true,
  },
});
