import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/lucide-react")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/@tanstack")) {
            return "query-vendor";
          }
          if (id.includes("node_modules/recharts")) {
            return "chart-vendor";
          }
          if (id.includes("node_modules/embla-carousel")) {
            return "carousel-vendor";
          }
          if (id.includes("node_modules/html2canvas")) {
            return "canvas-vendor";
          }
          if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/@hookform") || id.includes("node_modules/zod")) {
            return "form-vendor";
          }
        },
      },
    },
  },
}));
