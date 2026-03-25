<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();

useHead({
  title: 'Xaygo — Free Online Developer Tools',
  meta: [
    { name: 'description', content: 'Free online developer tools. No account. No login. Just open and use.' },
    { property: 'og:title', content: 'Xaygo — Free Online Developer Tools' },
  ],
});
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);
const popularTools = computed(() => toolStore.popularTools);

// Update favorite tools order when drag is finished
function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">
        Free Online Developer Tools
      </h1>
      <p class="hero-subtitle">
        No account. No login. Just open and use.
      </p>
    </div>

    <div class="grid-wrapper">
      <!-- Popular Tools -->
      <h2 class="section-heading">
        🔥 Popular Tools
      </h2>
      <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in popularTools" :key="tool.name" :tool="tool" />
      </div>

      <!-- Favorites -->
      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <h2 class="section-heading mt-25px">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" />
            </c-tooltip>
          </h2>
          <Draggable
            :list="favoriteTools"
            class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            @end="onUpdateFavoriteTools"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </div>
      </transition>

      <!-- All Tools -->
      <h2 class="section-heading mt-25px">
        {{ $t('home.categories.allTools') }}
      </h2>
      <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.hero-section {
  padding: 40px 24px 28px;
  text-align: center;

  .hero-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  .hero-subtitle {
    font-size: 16px;
    opacity: 0.6;
    margin: 0;
  }
}

.section-heading {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 10px;
  color: #838587;
}

.grid-wrapper {
  padding: 0 0 40px;
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: #ccc;
  border: 2px dashed #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}
</style>

