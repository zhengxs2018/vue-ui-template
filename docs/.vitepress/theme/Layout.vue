<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'

// import VSChatBox from '../plugins/vector-search/components/VSChatBox.vue'

const ParentLayout = DefaultTheme.Layout
</script>

<template>
  <ParentLayout>
    <template #layout-bottom>
      <ClientOnly>
        <VSChatBox />
      </ClientOnly>
    </template>
  </ParentLayout>
</template>
