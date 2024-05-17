import type { PropType, Component } from "vue";

import { ButtonTypes, ComponentSize } from "../../common/constants";

export type ButtonNativeType = "button" | "submit" | "reset";

export const ButtonNativeTypes: ButtonNativeType[] = [
  "button",
  "submit",
  "reset",
];

export const buttonProps = {
  /**
   * @description custom element tag
   */
  tag: {
    type: [String, Object] as PropType<string | Component>,
    default: "button",
  },
  /**
   * @description button size
   */
  size: {
    type: String as PropType<ComponentSize & (string & {})>,
    values: ComponentSize,
    required: false,
  },
  /**
   * @description button type
   */
  type: {
    type: String as PropType<ButtonTypes & (string & {})>,
    values: ButtonTypes,
    default: "",
  },
  text: Boolean,
  plain: Boolean,
  /**
   * @description native button type
   */
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    values: [],
    default: "button",
  },
  loading: Boolean,
  /**
   * @description disable the button
   */
  disabled: Boolean,
};
