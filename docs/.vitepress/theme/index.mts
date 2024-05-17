import { type Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import VPDemo from "./components/vp-demo/vp-demo.vue";

import UI from "../../../src/index";

export default {
  ...DefaultTheme,
  enhanceApp: (context) => {
    DefaultTheme.enhanceApp(context);

    context.app.use(UI);
    context.app.component("vp-demo", VPDemo);
  },
} as Theme;
