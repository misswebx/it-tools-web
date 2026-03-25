<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
  title: 'About | Xaygo — Free Online Developer Tools',
  meta: [
    { name: 'description', content: 'About Xaygo — free online developer tools, no account or login required. Operated by Xaygo Labs.' },
    { rel: 'canonical', href: 'https://xaygo.com/about' },
  ],
});
</script>

<template>
  <c-markdown :markdown="$t('about.content')" mx-auto mt-50px max-w-600px />
</template>
