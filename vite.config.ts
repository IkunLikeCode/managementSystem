import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { fileURLToPath } from "url";
import { viteMockServe } from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  // 从环境变量中获取API地址，也可以直接硬编码在这里
  const apiTarget = env.VITE_API_BASE_URL || "http://localhost:8080";

  return {
    root,
    base: "/",
    publicDir: fileURLToPath(new URL("./public", import.meta.url)),

    // 修正：使用正确的assetsInclude格式
    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
    ],

    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        // 如果接口为/mock开头，则会被mock拦截
        mockPath: "mock",
        enable: true,
      }),
      ElementPlus({}),
      // 自动引入组件及ICON
      AutoImport({
        resolvers: [IconsResolver(), ElementPlusResolver()],
        dts: fileURLToPath(
          new URL("./types/auto-imports.d.ts", import.meta.url)
        ),
      }),
      // 自动注册组件
      Components({
        resolvers: [IconsResolver(), ElementPlusResolver()],
        dts: fileURLToPath(new URL("./types/components.d.ts", import.meta.url)),
      }),
      // 自动安装图标
      Icons({
        autoInstall: true,
      }),
    ],

    server: {
      // 添加host配置，允许外部访问
      host: "0.0.0.0",

      // 修正：添加有效的API代理目标
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        input: {
          index: fileURLToPath(new URL("./index.html", import.meta.url)),
        },
        output: {
          format: "esm",
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./types", import.meta.url)),
      },
    },
  };
});
