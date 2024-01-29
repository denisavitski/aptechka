// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { vitePluginHTMLComponents } from 'vite-plugin-html-components'

export default defineConfig((e) => {
  const isLibMode = e.mode === 'lib'

  return {
    plugins: isLibMode
      ? [
          dtsPlugin({
            include: ['./src/packages'],
            copyDtsFiles: true,
          }),
        ]
      : [vitePluginHTMLComponents({ pages: ['index.html'] })],
    build: isLibMode
      ? {
          copyPublicDir: false,
          emptyOutDir: true,
          outDir: 'lib',
          target: 'es2016',
          lib: {
            name: 'Aptechka',
            entry: {
              'animation/index': './src/packages/animation/index.ts',
              'attribute/index': './src/packages/attribute/index.ts',
              'canvas-2d/index': './src/packages/canvas-2d/index.ts',
              'controls/index': './src/packages/controls/index.ts',
              'css-unit-parser/index': './src/packages/css-unit-parser/index.ts',
              'custom-element/index': './src/packages/custom-element/index.ts',
              'device/index': './src/packages/device/index.ts',
              'element-constructor/index': './src/packages/element-constructor/index.ts',
              'en3/index': './src/packages/en3/index.ts',
              'image/index': './src/packages/image/index.ts',
              'intersector/index': './src/packages/intersector/index.ts',
              'ladder/index': './src/packages/ladder/index.ts',
              'layout-box/index': './src/packages/layout-box/index.ts',
              'loading/index': './src/packages/loading/index.ts',
              'measurer/index': './src/packages/measurer/index.ts',
              'media/index': './src/packages/media/index.ts',
              'morph/index': './src/packages/morph/index.ts',
              'notifier/index': './src/packages/notifier/index.ts',
              'order/index': './src/packages/order/index.ts',
              'resizer/index': './src/packages/resizer/index.ts',
              'router/index': './src/packages/router/index.ts',
              'scroll/index': './src/packages/scroll/index.ts',
              'scroll-entries/index': './src/packages/scroll-entries/index.ts',
              'source/index': './src/packages/source/index.ts',
              'store/index': './src/packages/store/index.ts',
              'ticker/index': './src/packages/ticker/index.ts',
              'utils/index': './src/packages/utils/index.ts',
              'video/index': './src/packages/video/index.ts',
            },
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
          },
          rollupOptions: {
            external: Object.keys({
              ...packageJson.peerDependencies,
            }),
          },
        }
      : {},
    resolve: {
      alias: {
        $packages: resolve(__dirname, 'src/packages'),
      },
    },
  }
})
