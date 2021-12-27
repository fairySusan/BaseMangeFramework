import { defineConfig,loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element/index.scss" as *;`
        }
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import {h} from 'vue'`
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: "sass",
        })],
      }),
    ],
    server: {
      port: 3001,
      proxy: {
        '/devUrl': {
          target: 'http://172.31.40.171:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/devUrl/, '')
        },
      }
    }
  }
})
