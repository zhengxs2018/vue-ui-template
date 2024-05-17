import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps as external } from "vite-plugin-externalize-deps";

import pkg from "./package.json";

export default defineConfig({
  plugins: [external(), dts({ rollupTypes: true }), vue()],
  define: {
    "process.env.PKG_VERSION": JSON.stringify(pkg.version),
  },
  build: {
    sourcemap: false,
    copyPublicDir: false,
    lib: {
      entry: ["src/index.ts"],
      formats: ["es", "cjs"],
      fileName: (format, name) => {
        return `index${format === "es" ? ".esm" : ""}.js`;
      },
    },
    rollupOptions: {
      // @ts-expect-error
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") {
            return "index.css";
          }

          return assetInfo.name;
        },
        exports: "named",
      },
    },
  },
});
