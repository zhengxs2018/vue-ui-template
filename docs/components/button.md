---
title: 按钮
---

# {{ $frontmatter.title }}

这是按钮

## 基础

::: demo 一些描述内容，支持 markdown 语法，比如 `type="text"`

button/base

:::

## 文字

::: demo 无边框文字按钮

button/text

:::

## 镂空

::: demo 镂空按钮

button/variant

:::

## 禁用

::: demo 添加 disabled 可以禁用按钮

button/disabled

:::

## Button API

### Button Attributes

| 属性名      | 说明               | 类型                                                    | 默认值 |
| ----------- | ------------------ | ------------------------------------------------------- | ------ |
| size        | 尺寸               | `'large'\| 'default'\| 'small'`                         | —      |
| type        | 类型               | `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —      |
| plain       | 是否为朴素按钮     | `boolean`                                               | false  |
| text        | 是否为文字按钮     | `boolean`                                               | false  |
| link        | 是否为链接按钮     | `boolean`                                               | false  |
| disabled    | 按钮是否为禁用状态 | `boolean`                                               | false  |
| native-type | 原生 type 属性     | `'button'\| 'submit'\| 'reset'`                         | button |

### Button Slots

| 插槽名 | 说明           |
| ------ | -------------- |
| \_     | 自定义默认内容 |
