import { ComponentSize, ButtonTypes } from "./common/constants";

import LeButton from "./components/button/button.vue";
import { useNamespace } from "./composables/namespace";

import { config } from "./config";
import { version } from "./version";
import { install } from "./install";

import "./style/index.scss";

export {
  // Base
  ComponentSize,
  ButtonTypes,
  // Components
  LeButton,
  // Composition API
  useNamespace,
};

export default {
  install,
  config,
  version,
};
