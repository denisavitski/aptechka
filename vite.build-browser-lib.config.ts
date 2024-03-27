import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { browserSharedConfig } from './vite.browser-shared.config'

export const browserLibConfig: UserConfig = {
  plugins: [
    dtsPlugin({
      include: ['./dev-browser-lib/components/packages'],
      copyDtsFiles: true,
      exclude: '**/playground/**',
    }),
  ],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: 'build-browser-lib',
    target: 'es2016',
    lib: {
      name: 'Aptechka',
      entry: {
        'abstract-elements/index':
          './dev-browser-lib/components/packages/abstract-elements/index.ts',
        'accordion/index':
          './dev-browser-lib/components/packages/accordion/index.ts',
        'animation/index':
          './dev-browser-lib/components/packages/animation/index.ts',
        'animation/hooks/index':
          './dev-browser-lib/components/packages/animation/hooks/index.ts',
        'attribute/index':
          './dev-browser-lib/components/packages/attribute/index.ts',
        'canvas/index': './dev-browser-lib/components/packages/canvas/index.ts',
        'connector/index':
          './dev-browser-lib/components/packages/connector/index.ts',
        'controls/index':
          './dev-browser-lib/components/packages/controls/index.ts',
        'css-unit-parser/index':
          './dev-browser-lib/components/packages/css-unit-parser/index.ts',
        'custom-element/index':
          './dev-browser-lib/components/packages/custom-element/index.ts',
        'device/index': './dev-browser-lib/components/packages/device/index.ts',
        'element-constructor/index':
          './dev-browser-lib/components/packages/element-constructor/index.ts',
        'element-resizer/index':
          './dev-browser-lib/components/packages/element-resizer/index.ts',
        'element-resizer/hooks/index':
          './dev-browser-lib/components/packages/element-resizer/hooks/index.ts',
        'en3/index': './dev-browser-lib/components/packages/en3/index.ts',
        'image/index': './dev-browser-lib/components/packages/image/index.ts',
        'intersector/index':
          './dev-browser-lib/components/packages/intersector/index.ts',
        'intersector/hooks/index':
          './dev-browser-lib/components/packages/intersector/hooks/index.ts',
        'jsx/index': './dev-browser-lib/components/packages/jsx/index.ts',
        'jsx/hooks/index':
          './dev-browser-lib/components/packages/jsx/hooks/index.ts',
        'ladder/index': './dev-browser-lib/components/packages/ladder/index.ts',
        'layout-box/index':
          './dev-browser-lib/components/packages/layout-box/index.ts',
        'loading/index':
          './dev-browser-lib/components/packages/loading/index.ts',
        'media/index': './dev-browser-lib/components/packages/media/index.ts',
        'modal/index': './dev-browser-lib/components/packages/modal/index.ts',
        'morph/index': './dev-browser-lib/components/packages/morph/index.ts',
        'notifier/index':
          './dev-browser-lib/components/packages/notifier/index.ts',
        'order/index': './dev-browser-lib/components/packages/order/index.ts',
        'popover/index':
          './dev-browser-lib/components/packages/popover/index.ts',
        'resized/index':
          './dev-browser-lib/components/packages/resized/index.ts',
        'router/index': './dev-browser-lib/components/packages/router/index.ts',
        'scroll/index': './dev-browser-lib/components/packages/scroll/index.ts',
        'scroll-entries/index':
          './dev-browser-lib/components/packages/scroll-entries/index.ts',
        'select/index': './dev-browser-lib/components/packages/select/index.ts',
        'slicer/index': './dev-browser-lib/components/packages/slicer/index.ts',
        'source/index': './dev-browser-lib/components/packages/source/index.ts',
        'store/index': './dev-browser-lib/components/packages/store/index.ts',
        'store/hooks/index':
          './dev-browser-lib/components/packages/store/hooks/index.ts',
        'studio/index': './dev-browser-lib/components/packages/studio/index.ts',
        'theme/index': './dev-browser-lib/components/packages/theme/index.ts',
        'ticker/index': './dev-browser-lib/components/packages/ticker/index.ts',
        'ticker/hooks/index':
          './dev-browser-lib/components/packages/ticker/hooks/index.ts',
        'utils/index': './dev-browser-lib/components/packages/utils/index.ts',
        'video/index': './dev-browser-lib/components/packages/video/index.ts',
        'window-resizer/index':
          './dev-browser-lib/components/packages/window-resizer/index.ts',
        'window-resizer/hooks/index':
          './dev-browser-lib/components/packages/window-resizer/hooks/index.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: Object.keys({
        ...packageJson.peerDependencies,
      }),
    },
  },
  ...browserSharedConfig,
}
