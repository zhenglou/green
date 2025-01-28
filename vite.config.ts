import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      resolvers: [ElementPlusResolver()],
      dts:true,
      eslintrc: {
        enabled: false, // 1、true时生成eslint配置文件，2、生成后改为false，避免重复消耗
      },
    }),
    Components({
      resolvers: [NaiveUiResolver(),ElementPlusResolver()],
      dts: './components.d.ts',
    })
  ]
})
