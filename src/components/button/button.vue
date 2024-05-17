<script lang="ts" setup>
import { computed } from "vue";

import { useNamespace } from "../../composables/namespace";
import { ButtonTypes, ComponentSize } from "../../common/constants";

import { buttonProps } from "./props";

defineOptions({
  name: "LeButton",
});

const props = defineProps(buttonProps);

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
});

const ns = useNamespace("button");

// TODO 需要和 ButtonGroup 的 type 联动
const buttonType = computed(() => props.type || ButtonTypes.Default);

// TODO 需要和 ButtonGroup 的 type 联动
const buttonSize = computed(() => props.size || ComponentSize.Default);

// TODO 需要和 Form 组件联动
const isDisabled = computed(() => {
  return props.disabled === true;
});

const buttonAttrs = computed(() => {
  if (props.tag === "button") {
    return {
      ariaDisabled: isDisabled.value || props.loading,
      disabled: isDisabled.value || props.loading,
      type: props.nativeType,
    };
  }

  return {};
});

const buttonClass = computed(() => {
  return [
    ns.b(),
    ns.m(buttonType.value),
    ns.m(buttonSize.value),
    ns.m(props.plain && "plain"),
    ns.m(props.text && "text"),
    ns.is("disabled", isDisabled.value),
  ];
});

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return;

  emit('click', event);
};
</script>

<template>
  <component
    :is="tag"
    v-bind="buttonAttrs"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>
