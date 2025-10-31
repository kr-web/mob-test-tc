import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  base: "/mob-test-tc/",
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react-no-replace",
      svgrOptions: {}, // currentColor 치환 없음
    }),
    svgr({
      include: "**/*.svg?react",
      exclude: "**/*.svg?react-no-replace",
      svgrOptions: {
        icon: true,
        svgProps: {
          fill: "currentColor",
        },
        replaceAttrValues: {
          "#9FA3B7": "currentColor",
          "#DFE2E9": "currentColor",
          // "#575E83": "currentColor"
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://61.75.21.224:8080",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
