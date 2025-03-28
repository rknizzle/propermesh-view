import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from 'vike/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [react(), vike(),],
  plugins: [react(),],

  server: {
    open: true,

    // proxy API requests to the propermesh backend server which runs at port 5005 when running locally
    proxy: {
      "/api": {
        target: "http://localhost:5005",
      },
      "/auth": {
        target: "http://localhost:5005",
      },
      // NOTE: /docs and /openapi.json are for loading the openapi API docs from the backend server
      "/docs": {
        target: "http://localhost:5005",
      },
      "/openapi.json": {
        target: "http://localhost:5005",
      },
    },
  },
  optimizeDeps: {
    exclude: ["chunk-S2TLTWWO.js.map"],
  },
});
