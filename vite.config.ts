import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ["VITE_"],
  plugins: [react(), tsConfigPaths()],
  build:{
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true
    }
  }
});
