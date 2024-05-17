import { DefaultTheme } from "vitepress/theme";

export const sidebar: DefaultTheme.Sidebar = {
  "/guide/": [
    {
      text: "指南",
      items: [
        {
          text: "介绍",
          link: "/guide/",
        },
        {
          text: "快速上手",
          link: "/guide/getting-started",
        },
      ],
    },
  ],
  "/components/": [
    {
      text: "组件总览",
      link: "/components/overview",
    },
    {
      text: "通用",
      items: [
        {
          text: "Button 按钮",
          link: "/components/button",
        },
      ],
    },
  ],
};
