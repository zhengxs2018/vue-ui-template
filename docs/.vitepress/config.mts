import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitepress";

import { sidebar } from "./config/sidebar.mjs";
import { navbar } from "./config/navbar.mjs";

import { components } from "./plugins/components.mjs";
import { createDemoContainer } from "./markdown/demo.mjs";

export const DOC_ROOT_DIR = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lemon UI",
  description: "Vue 3 UI Framework",
  themeConfig: {
    nav: navbar,
    sidebar: sidebar,
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(
        ...createDemoContainer(md, {
          root: path.join(DOC_ROOT_DIR, "examples"),
        })
      );
    },
  },
  vite: {
    // server: {
    //   fs: {
    //     allow: [path.dirname(DOC_ROOT_DIR)],
    //   },
    // },
    define: {
      "process.env": "{}",
    },
    plugins: [
      components({
        root: path.join(DOC_ROOT_DIR, "components"),
        include: ["*.md"],
      }),
    ],
  },
});
