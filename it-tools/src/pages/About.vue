<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
  title: 'About | Xaygo — Free Online Developer Tools',
  meta: [
    { name: 'description', content: 'About Xaygo — free online developer tools, no account or login required. Operated by Xaygo Labs.' },
    { rel: 'canonical', href: 'https://xaygo.com/about' },
  ],
});

const aboutContent = `# About Xaygo

Xaygo is a free collection of online developer tools.
No account. No login. No installation. Just open the tool and get things done.

Built for developers, designers, and anyone who works with data — from JSON formatting and Base64 encoding to JWT decoding and color conversion.

Operated by **Xaygo Labs** · support@xaygo.com · © 2026 Xaygo Labs

---

This project is based on [it-tools](https://github.com/CorentinTh/it-tools) by CorentinTh, licensed under GPL-3.0.
Source code: [github.com/misswebx/it-tools-web](https://github.com/misswebx/it-tools-web)
`;
</script>

<template>
  <c-markdown :markdown="aboutContent" mx-auto mt-50px max-w-600px />
</template>
