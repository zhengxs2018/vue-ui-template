<script setup lang="ts">
import { useToggle } from "@vueuse/core";

import { computed, ref } from "vue";

import Example from "./vp-example.vue";
import SourceCode from "./vp-source-code.vue";

const props = defineProps<{
  demos: object;
  path: string;
}>();

const [sourceVisible, toggleSourceVisible] = useToggle();

const sourceCodeRef = ref<HTMLButtonElement>();
const formatPathDemos = computed(() => {
  const demos: Record<string, any> = {};

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace("../examples/", "").replace(".vue", "")] =
      props.demos[key].default;
  });

  return demos;
});

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (["Enter", "Space"].includes(e.code)) {
    e.preventDefault();
    toggleSourceVisible(false);
    sourceCodeRef.value?.focus();
  }
};
</script>

<template>
  <ClientOnly>
    <p text="sm">
      <slot name="description"></slot>
    </p>

    <div class="example vp-raw">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <div class="op-btns">
        <button
          ref="sourceCodeRef"
          class="reset-btn op-btn"
          @click="toggleSourceVisible()"
        >
          查看源代码
        </button>
      </div>

      <SourceCode v-show="sourceVisible">
        <slot name="source"></slot>
      </SourceCode>

      <Transition name="vp-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
.example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.op-btns {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.op-btn {
  margin: 0 0.5rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: 0.2s;
}

.op-btn:hover {
  color: var(--vp-c-brand-1);
}

.float-control {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider);
  height: 44px;
  box-sizing: border-box;
  background-color: var(--vp-c-bg-color, #fff);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-top: -1px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.float-control span {
  font-size: 14px;
  margin-left: 10px;
}

.float-control:hover {
  color: var(--vp-c-brand-1);
}
</style>
