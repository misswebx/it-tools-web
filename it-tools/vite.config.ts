import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { URL, fileURLToPath } from 'node:url';

import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import markdown from 'vite-plugin-vue-markdown';
import svgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config';

const baseUrl = process.env.BASE_URL ?? '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      jitCompilation: true,
      compositionOnly: true,
      fullInstall: true,
      strictMessage: false,
      include: [
        resolve(__dirname, 'locales/**'),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vue-i18n',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Icons({ compiler: 'vue3' }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    markdown(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        // Do NOT intercept navigation requests for static/SEO files.
        // Without this, the SW's NavigationRoute returns index.html for
        // /sitemap.xml, /robots.txt, etc., causing the Vue 404 page to render.
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/browserconfig\.xml$/, /\.\w+$/],
        // Exclude Vite's internal CommonJS-proxy shims from the precache manifest.
        // Tools like bcrypt and hash-text depend on these files via dynamic import.
        // When the SW precaches them it can fail to serve them, blocking tool load.
        // Excluding them lets requests fall through to the network (CDN-cached via
        // content-hash filename) without any SW interference.
        globIgnores: ['**/___vite-browser-external*', '**/*-commonjs-proxy*'],
        // Remove stale precache entries whenever a new SW activates, so assets
        // from a previous deployment don't linger and cause cache conflicts.
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Xaygo — Developer Tools',
        short_name: 'Xaygo',
        description: 'Free online developer tools. No account, no login, just open and use.',
        display: 'standalone',
        lang: 'en',
        start_url: `${baseUrl}?utm_source=pwa&utm_medium=pwa`,
        orientation: 'any',
        theme_color: '#00bfff',
        background_color: '#f1f5f9',
        icons: [
          {
            src: '/favicon-16x16.png',
            type: 'image/png',
            sizes: '16x16',
          },
          {
            src: '/favicon-32x32.png',
            type: 'image/png',
            sizes: '32x32',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Components({
      dirs: ['src/'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })],
    }),
    Unocss(),
    {
      name: 'ssg-post-build',
      closeBundle() {
        // Run SSG meta injection + sitemap generation after every production build.
        // This ensures it runs even when Cloudflare Pages uses its Vite preset
        // (which executes `vite build` directly instead of `pnpm build`).
        if (process.env.NODE_ENV !== 'production') return;
        const result = spawnSync('node', ['scripts/generate-ssg.mjs'], { stdio: 'inherit' });
        if (result.status !== 0) {
          throw new Error('[ssg-post-build] generate-ssg.mjs failed');
        }
      },
    },
  ],
  base: baseUrl,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  test: {
    exclude: [...configDefaults.exclude, '**/*.e2e.spec.ts'],
  },
  build: {
    target: 'esnext',
  },
});
