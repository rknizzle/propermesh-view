import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  optimizeDeps: {
    exclude: ["chunk-S2TLTWWO.js.map"],
  },
});
