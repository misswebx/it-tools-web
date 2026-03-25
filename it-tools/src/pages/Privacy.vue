<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
  title: 'Privacy Policy | Xaygo',
  meta: [
    { name: 'description', content: 'Privacy Policy for Xaygo — how we collect and use data.' },
    { rel: 'canonical', href: 'https://xaygo.com/privacy' },
  ],
});
</script>

<template>
  <div mx-auto mt-50px max-w-700px px-4>
    <h1 text-2xl font-bold mb-6>
      Privacy Policy
    </h1>

    <p text-sm text-neutral-400 mb-8>
      Effective date: January 1, 2026 · Operated by Xaygo Labs · <a href="mailto:support@xaygo.com">support@xaygo.com</a>
    </p>

    <h2 text-lg font-semibold mb-3>
      1. What we collect
    </h2>
    <p mb-6>
      Xaygo uses <strong>Google Analytics 4 (GA4)</strong> to collect anonymous usage data (pages visited, session duration,
      browser type, country). No personally identifiable information is collected. All tools run entirely in your browser —
      no data you enter into any tool is ever sent to our servers.
    </p>

    <h2 text-lg font-semibold mb-3>
      2. Advertising cookies (Google AdSense)
    </h2>
    <p mb-6>
      We display advertisements served by <strong>Google AdSense</strong>. Google and its partners may use cookies to
      serve ads based on your prior visits to this or other websites. You can opt out of personalised advertising at
      <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.
    </p>

    <h2 text-lg font-semibold mb-3>
      3. Third-party services
    </h2>
    <p mb-6>
      We may use Cloudflare for CDN and DDoS protection, which may log request metadata (IP address, timestamps) as per
      their <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Privacy Policy</a>.
    </p>

    <h2 text-lg font-semibold mb-3>
      4. Your rights
    </h2>
    <p mb-6>
      You can disable cookies in your browser settings at any time. For questions about this policy, contact us at
      <a href="mailto:support@xaygo.com">support@xaygo.com</a>.
    </p>

    <h2 text-lg font-semibold mb-3>
      5. Changes to this policy
    </h2>
    <p mb-6>
      We may update this policy as the site evolves. The effective date at the top of this page will reflect the most
      recent revision.
    </p>

    <p text-sm text-neutral-400 mt-12>
      © 2026 Xaygo Labs · <RouterLink to="/">Home</RouterLink> · <a href="mailto:support@xaygo.com">Contact</a>
    </p>
  </div>
</template>

<style scoped>
a {
  color: #00bfff;
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: #29cbff;
  text-decoration: underline;
}
</style>
