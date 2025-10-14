import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { sharedConfig } from './vite.shared.config'

export function libConfig() {
  const shared = sharedConfig()

  const config: UserConfig = {
    ...shared,
    plugins: [
      ...shared.plugins!,
      dtsPlugin({
        include: ['./src/components/packages'],
        copyDtsFiles: true,
        exclude: ['**/playground/**'],
      }),
    ],
    build: {
      copyPublicDir: false,
      emptyOutDir: true,
      outDir: 'lib',
      target: 'es2016',
      sourcemap: false,
      lib: {
        name: 'Aptechka',
        entry: {
          'accordion/index': './src/components/packages/accordion/index.ts',
          'animation/index': './src/components/packages/animation/index.ts',
          'api-fetcher/index': './src/components/packages/api-fetcher/index.ts',
          'attribute/index': './src/components/packages/attribute/index.ts',
          'billboard/index': './src/components/packages/billboard/index.ts',
          'cache/index': './src/components/packages/cache/index.ts',
          'canvas/index': './src/components/packages/canvas/index.ts',
          'color/index': './src/components/packages/color/index.ts',
          'element-linked-store/index':
            './src/components/packages/element-linked-store/index.ts',
          'connector/index': './src/components/packages/connector/index.ts',
          'controls/index': './src/components/packages/controls/index.ts',
          'css-property/index':
            './src/components/packages/css-property/index.ts',
          'css-unit-parser/index':
            './src/components/packages/css-unit-parser/index.ts',
          'css-value-parser/index':
            './src/components/packages/css-value-parser/index.ts',
          'dev/index': './src/components/packages/dev/index.ts',
          'device/index': './src/components/packages/device/index.ts',
          'element-resizer/index':
            './src/components/packages/element-resizer/index.ts',
          'en3/index': './src/components/packages/en3/index.ts',
          'history/index': './src/components/packages/history/index.ts',
          'image/index': './src/components/packages/image/index.ts',
          'iframe/index': './src/components/packages/iframe/index.ts',
          'intersector/index': './src/components/packages/intersector/index.ts',
          'jsx/index': './src/components/packages/jsx/index.ts',
          'jsx/plugins/vite/index':
            './src/components/packages/jsx/plugins/vite/index.ts',
          'ladder/index': './src/components/packages/ladder/index.ts',
          'layout-box/index': './src/components/packages/layout-box/index.ts',
          'loading/index': './src/components/packages/loading/index.ts',
          'local-links/index': './src/components/packages/local-links/index.ts',
          'masonry-layout/index':
            './src/components/packages/masonry-layout/index.ts',
          'media/index': './src/components/packages/media/index.ts',
          'morph/index': './src/components/packages/morph/index.ts',
          'notifier/index': './src/components/packages/notifier/index.ts',

          'order/index': './src/components/packages/order/index.ts',
          'page-announcer/index':
            './src/components/packages/page-announcer/index.ts',
          'page-scroll/index': './src/components/packages/page-scroll/index.ts',
          'pixel-perfect/index':
            './src/components/packages/pixel-perfect/index.ts',
          'pointer/index': './src/components/packages/pointer/index.ts',
          'popover/index': './src/components/packages/popover/index.ts',
          'radio/index': './src/components/packages/radio/index.ts',
          'router/index': './src/components/packages/router/index.ts',
          'scroll/index': './src/components/packages/scroll/index.ts',
          'scroll-entries/index':
            './src/components/packages/scroll-entries/index.ts',
          'scroll-kit/index': './src/components/packages/scroll-kit/index.ts',
          'sequence/index': './src/components/packages/sequence/index.ts',
          'size-element/index':
            './src/components/packages/size-element/index.ts',
          'slicer/index': './src/components/packages/slicer/index.ts',
          'source/index': './src/components/packages/source/index.ts',
          'spa/index': './src/components/packages/spa/index.ts',
          'store/index': './src/components/packages/store/index.ts',
          'subtree-observer/index':
            './src/components/packages/subtree-observer/index.ts',
          'ticker/index': './src/components/packages/ticker/index.ts',
          'need_redo_tweaker/index':
            './src/components/packages/need_redo_tweaker/index.ts',
          'notched/index': './src/components/packages/notched/index.ts',
          'utils/index': './src/components/packages/utils/index.ts',
          'video/index': './src/components/packages/video/index.ts',
          'window-resizer/index':
            './src/components/packages/window-resizer/index.ts',
          'youtube/index': './src/components/packages/youtube/index.ts',
        },
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`
        },
      },
      rollupOptions: {
        external: [
          ...Object.keys({
            ...packageJson.peerDependencies,
            'global-jsdom/register': true,
          }),
        ],
        // onwarn(warning, defaultHandler) {
        //   if (warning.code === 'SOURCEMAP_ERROR') {
        //     return
        //   }

        //   defaultHandler(warning)
        // },
      },
    },
  }

  return config
}
