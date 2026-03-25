<script setup lang="ts">
/**
 * AdSlot — placeholder for Google AdSense ad units.
 *
 * During AdSense review the slot renders as an empty, invisible container.
 * After approval, replace the inner comment with the real AdSense <ins> tag
 * and call (adsbygoogle = window.adsbygoogle || []).push({}).
 *
 * Usage:
 *   <AdSlot slot-id="tool-bottom" format="horizontal" />   → 728×90 leaderboard
 *   <AdSlot slot-id="sidebar"     format="vertical"   />   → 160×600 skyscraper
 *   <AdSlot slot-id="mobile-top"  format="mobile"     />   → 320×50  mobile banner
 */

defineProps<{
  slotId: string;
  format?: 'horizontal' | 'vertical' | 'mobile' | 'responsive';
}>();
</script>

<template>
  <!-- AdSense placeholder — replace contents with <ins class="adsbygoogle"> after approval -->
  <div
    class="ad-slot"
    :class="`ad-slot--${format ?? 'responsive'}`"
    :data-slot="slotId"
    aria-hidden="true"
  />
</template>

<style scoped>
.ad-slot {
  display: block;
  overflow: hidden;
  /* invisible until AdSense injects content */
  background: transparent;
}

.ad-slot--horizontal {
  width: 100%;
  max-width: 728px;
  height: 90px;
  margin: 16px auto;
}

.ad-slot--vertical {
  width: 160px;
  height: 600px;
  margin: 0 auto;
}

.ad-slot--mobile {
  width: 320px;
  height: 50px;
  margin: 8px auto;
}

.ad-slot--responsive {
  width: 100%;
  min-height: 90px;
  margin: 16px 0;
}
</style>
