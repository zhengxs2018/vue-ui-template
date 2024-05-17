import type { App } from "vue";

import { config, type UIConfiguration } from "./config";

import Button from "./components/button/button.vue";

export function install(app: App, options?: Partial<UIConfiguration>): void {
  if (options) Object.assign(config, options);

  app.component(Button.name as string, Button);
}
