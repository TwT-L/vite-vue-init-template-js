import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        {
          'pinia': [
            'defineStore',
            'createPinia',
            'storeToRefs',
          ]
        },
        {
          'vuex': [
            'useStore'
          ],
          'vue-i18n': [
            'useI18n',
            'createI18n'
          ],
          'dayjs': [['default', 'dayjs']]
        }
      ],
      dirs: [
        './src/libs/components/*',
        './src/libs/hooks',
        './src/plugins'
      ]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          resolveIcons: true
        })
      ]
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: {
          // 'btn-border-radius-base': '4px'
        }
      }
    }
  }
})
