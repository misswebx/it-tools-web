<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { BrandGithub, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import XaygoLogo from '../assets/xaygo-logo.png';
import XaygoIcon from '../assets/xaygo-icon.png';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import AdSlot from '@/components/AdSlot.vue';

const styleStore = useStyleStore();

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <img
          v-if="!styleStore.isMenuCollapsed"
          :src="XaygoLogo"
          alt="Xaygo"
          class="xaygo-logo-full"
        >
        <img
          v-else
          :src="XaygoIcon"
          alt="Xaygo"
          class="xaygo-logo-icon"
        >
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <AdSlot slot-id="sidebar" format="vertical" />
      </div>
    </template>

    <template #content>
      <header class="content-header">
        <div class="header-left">
          <c-button
            circle
            variant="text"
            :aria-label="$t('home.toggleMenu')"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="25" :component="Menu2" />
          </c-button>

          <c-tooltip :tooltip="$t('home.home')" position="bottom">
            <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
              <NIcon size="25" :component="Home2" />
            </c-button>
          </c-tooltip>

          <command-palette />
        </div>

        <nav class="header-nav">
          <RouterLink to="/privacy" class="header-nav-link">Privacy Policy</RouterLink>
          <RouterLink to="/terms" class="header-nav-link">Terms and Conditions</RouterLink>
          <RouterLink to="/about" class="header-nav-link">About</RouterLink>
          <locale-selector v-if="!styleStore.isSmallScreen" />
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </nav>
      </header>

      <slot />

      <footer class="content-footer">
        <RouterLink to="/privacy" class="footer-link">Privacy Policy</RouterLink>
        <span class="footer-sep">·</span>
        <RouterLink to="/terms" class="footer-link">Terms and Conditions</RouterLink>
        <span class="footer-sep">·</span>
        <RouterLink to="/about" class="footer-link">About</RouterLink>
        <span class="footer-sep">·</span>
        <a
          href="https://github.com/misswebx/it-tools-web"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link footer-github"
          aria-label="GitHub repository"
        >
          <NIcon size="16" :component="BrandGithub" />
        </a>
        <span class="footer-divider" />
        <span class="footer-copyright">© {{ new Date().getFullYear() }} Xaygo Labs </span>
      </footer>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
// ::v-deep(.n-layout-scroll-container) {
//     @percent: 4%;
//     @position: 25px;
//     @size: 50px;
//     @color: #eeeeee25;
//     background-image: radial-gradient(@color @percent, transparent @percent),
//         radial-gradient(@color @percent, transparent @percent);
//     background-position: 0 0, @position @position;
//     background-size: @size @size;
// }

.sider-content {
  padding-top: 20px;
  padding-bottom: 200px;
}

.hero-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px 12px;
  text-decoration: none;

  .xaygo-logo-full {
    width: 140px;
    height: auto;
    display: block;
  }

  .xaygo-logo-icon {
    width: 36px;
    height: auto;
    display: block;
  }
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
  gap: 8px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 4px;

    .header-nav-link {
      padding: 4px 8px;
      font-size: 13px;
      text-decoration: none;
      color: inherit;
      opacity: 0.65;
      border-radius: 4px;
      transition: opacity 0.15s;

      &:hover {
        opacity: 1;
      }

      &.router-link-active {
        opacity: 1;
        font-weight: 500;
      }
    }
  }
}

.content-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 10px;
  padding: 20px 16px;
  font-size: 13px;
  color: inherit;
  opacity: 0.65;
  border-top: 1px solid rgba(128, 128, 128, 0.15);

  .footer-link {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.8;
    }
  }

  .footer-sep {
    opacity: 0.5;
  }

  .footer-divider {
    display: block;
    width: 100%;
    height: 0;
  }

  .footer-copyright {
    width: 100%;
    text-align: center;
    font-size: 11px;
    opacity: 0.7;
  }

  .footer-github {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
}
</style>
