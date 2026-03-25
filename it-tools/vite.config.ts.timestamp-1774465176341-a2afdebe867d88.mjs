// vite.config.ts
import { resolve } from "node:path";
import { URL, fileURLToPath } from "node:url";
import VueI18n from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_rollup@2.79.2_vue-i18n@9.9.1_vue@3.3.4_/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import vue from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/@vitejs+plugin-vue@4.3.2_vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0__vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.2_vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0__vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Unocss from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unocss@0.65.1_postcss@8.4.49_rollup@2.79.2_vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0__vue@3.3.4/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unplugin-auto-import@0.16.4_@vueuse+core@10.3.0_vue@3.3.4__rollup@2.79.2/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unplugin-icons@0.17.0_@vue+compiler-sfc@3.2.47_vue-template-compiler@2.7.16/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unplugin-icons@0.17.0_@vue+compiler-sfc@3.2.47_vue-template-compiler@2.7.16/node_modules/unplugin-icons/dist/vite.mjs";
import { NaiveUiResolver } from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unplugin-vue-components@0.25.0_@babel+parser@7.26.3_rollup@2.79.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/unplugin-vue-components@0.25.0_@babel+parser@7.26.3_rollup@2.79.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/vite-plugin-pwa@0.16.0_vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0__workbox-buil_wmc6tzphtagfgenhvww4ekfqeu/node_modules/vite-plugin-pwa/dist/index.js";
import markdown from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/vite-plugin-vue-markdown@0.23.5_rollup@2.79.2_vite@4.4.9_@types+node@18.15.11_less@4.1.3_terser@5.37.0_/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import svgLoader from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";
import { configDefaults } from "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/node_modules/.pnpm/vitest@0.34.0_jsdom@22.0.0_less@4.1.3_terser@5.37.0/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/Users/dev/workspace/labs/xaygo/it-tools-web/it-tools";
var __vite_injected_original_import_meta_url = "file:///Users/dev/workspace/labs/xaygo/it-tools-web/it-tools/vite.config.ts";
var baseUrl = process.env.BASE_URL ?? "/";
var vite_config_default = defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      jitCompilation: true,
      compositionOnly: true,
      fullInstall: true,
      strictMessage: false,
      include: [
        resolve(__vite_injected_original_dirname, "locales/**")
      ]
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "vue-i18n",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Icons({ compiler: "vue3" }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    markdown(),
    svgLoader(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      manifest: {
        name: "Xaygo \u2014 Developer Tools",
        short_name: "Xaygo",
        description: "Free online developer tools. No account, no login, just open and use.",
        display: "standalone",
        lang: "en",
        start_url: `${baseUrl}?utm_source=pwa&utm_medium=pwa`,
        orientation: "any",
        theme_color: "#18a058",
        background_color: "#f1f5f9",
        icons: [
          {
            src: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16"
          },
          {
            src: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32"
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    Components({
      dirs: ["src/"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: "icon" })]
    }),
    Unocss()
  ],
  base: baseUrl,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(process.env.npm_package_version)
  },
  test: {
    exclude: [...configDefaults.exclude, "**/*.e2e.spec.ts"]
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGV2L3dvcmtzcGFjZS9sYWJzL3hheWdvL2l0LXRvb2xzLXdlYi9pdC10b29sc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Rldi93b3Jrc3BhY2UvbGFicy94YXlnby9pdC10b29scy13ZWIvaXQtdG9vbHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Rldi93b3Jrc3BhY2UvbGFicy94YXlnby9pdC10b29scy13ZWIvaXQtdG9vbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcblxuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJztcbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgbWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duJztcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJztcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5CQVNFX1VSTCA/PyAnLyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgVnVlSTE4bih7XG4gICAgICBydW50aW1lT25seTogdHJ1ZSxcbiAgICAgIGppdENvbXBpbGF0aW9uOiB0cnVlLFxuICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgZnVsbEluc3RhbGw6IHRydWUsXG4gICAgICBzdHJpY3RNZXNzYWdlOiBmYWxzZSxcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAge1xuICAgICAgICAgICduYWl2ZS11aSc6IFsndXNlRGlhbG9nJywgJ3VzZU1lc3NhZ2UnLCAndXNlTm90aWZpY2F0aW9uJywgJ3VzZUxvYWRpbmdCYXInXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIEljb25zKHsgY29tcGlsZXI6ICd2dWUzJyB9KSxcbiAgICB2dWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgIH0pLFxuICAgIHZ1ZUpzeCgpLFxuICAgIG1hcmtkb3duKCksXG4gICAgc3ZnTG9hZGVyKCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIHN0cmF0ZWdpZXM6ICdnZW5lcmF0ZVNXJyxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdYYXlnbyBcdTIwMTQgRGV2ZWxvcGVyIFRvb2xzJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ1hheWdvJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdGcmVlIG9ubGluZSBkZXZlbG9wZXIgdG9vbHMuIE5vIGFjY291bnQsIG5vIGxvZ2luLCBqdXN0IG9wZW4gYW5kIHVzZS4nLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgIHN0YXJ0X3VybDogYCR7YmFzZVVybH0/dXRtX3NvdXJjZT1wd2EmdXRtX21lZGl1bT1wd2FgLFxuICAgICAgICBvcmllbnRhdGlvbjogJ2FueScsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzE4YTA1OCcsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZjFmNWY5JyxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvZmF2aWNvbi0xNngxNi5wbmcnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBzaXplczogJzE2eDE2JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9mYXZpY29uLTMyeDMyLnBuZycsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMzJ4MzInLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFsnc3JjLyddLFxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKSwgSWNvbnNSZXNvbHZlcih7IHByZWZpeDogJ2ljb24nIH0pXSxcbiAgICB9KSxcbiAgICBVbm9jc3MoKSxcbiAgXSxcbiAgYmFzZTogYmFzZVVybCxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlBBQ0tBR0VfVkVSU0lPTic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pLFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZXhjbHVkZTogWy4uLmNvbmZpZ0RlZmF1bHRzLmV4Y2x1ZGUsICcqKi8qLmUyZS5zcGVjLnRzJ10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixTQUFTLGVBQWU7QUFDelcsU0FBUyxLQUFLLHFCQUFxQjtBQUVuQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsc0JBQXNCO0FBaEIvQixJQUFNLG1DQUFtQztBQUF5SyxJQUFNLDJDQUEyQztBQWtCblEsSUFBTSxVQUFVLFFBQVEsSUFBSSxZQUFZO0FBR3hDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLGFBQWE7QUFBQSxNQUNiLGVBQWU7QUFBQSxNQUNmLFNBQVM7QUFBQSxRQUNQLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ2pDO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNFLFlBQVksQ0FBQyxhQUFhLGNBQWMsbUJBQW1CLGVBQWU7QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFBQSxJQUMxQixJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsSUFDN0IsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sV0FBVyxHQUFHLE9BQU87QUFBQSxRQUNyQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsTUFBTSxDQUFDLE1BQU07QUFBQSxNQUNiLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxNQUN6QyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxFQUFFLFFBQVEsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUNsRSxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLG1DQUFtQyxLQUFLLFVBQVUsUUFBUSxJQUFJLG1CQUFtQjtBQUFBLEVBQ25GO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsR0FBRyxlQUFlLFNBQVMsa0JBQWtCO0FBQUEsRUFDekQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
