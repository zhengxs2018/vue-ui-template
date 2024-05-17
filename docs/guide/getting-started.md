---
title: 快速上手
---

# {{ $frontmatter.title }}

通过 npm 直接安装。

## 安装

::: code-group

```sh [yarn]
$ yarn add lemon-ui
```

```sh [pnpm]
$ pnpm add lemon-ui
```

```sh [npm]
$ npm i -S lemon-ui
```

:::

## 使用

现在可以在项目中导入组件了。

::: tip 提示

暂不支持样式的局部导入。

:::

::: code-group

```js [全局注册]
import { createApp } from "vue";

import LemonUI from "lemon-ui";
import "lemon-ui/dist/index.css";

import App from "./App.vue";

const app = createApp(App);

app.use(LemonUI);
```

```vue [局部导入]
<script setup>
import { LeButton } from "lemon-ui";
</script>

<template>
  <LeButton>按钮</LeButton>
</template>
```

:::

你可以继续浏览文档其他内容，以了解更多使用技巧。
