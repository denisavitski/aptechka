import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { browserSharedConfig } from './vite.shared.config'

export function buildConfig() {
  const config: UserConfig = {
    plugins: [
      dtsPlugin({
        include: ['./src/components/packages'],
        copyDtsFiles: true,
        exclude: '**/playground/**',
      }),
    ],
    build: {
      copyPublicDir: false,
      emptyOutDir: true,
      outDir: 'lib',
      target: 'es2016',
      lib: {
        name: 'Aptechka',
        entry: {
          'accordion/index': './src/components/packages/accordion/index.ts',
          'animation/index': './src/components/packages/animation/index.ts',
          'attribute/index': './src/components/packages/attribute/index.ts',
          'canvas/index': './src/components/packages/canvas/index.ts',
          'checkbox/index': './src/components/packages/checkbox/index.ts',
          'connector/index': './src/components/packages/connector/index.ts',
          'controls/index': './src/components/packages/controls/index.ts',
          'css-property/index':
            './src/components/packages/css-property/index.ts',
          'css-unit-parser/index':
            './src/components/packages/css-unit-parser/index.ts',
          'css-value-parser/index':
            './src/components/packages/css-value-parser/index.ts',
          'custom-element/index':
            './src/components/packages/custom-element/index.ts',
          'dev/index': './src/components/packages/dev/index.ts',
          'device/index': './src/components/packages/device/index.ts',
          'element-constructor/index':
            './src/components/packages/element-constructor/index.ts',
          'element-resizer/index':
            './src/components/packages/element-resizer/index.ts',
          'en3/index': './src/components/packages/en3/index.ts',
          'image/index': './src/components/packages/image/index.ts',
          'intersector/index': './src/components/packages/intersector/index.ts',
          'ladder/index': './src/components/packages/ladder/index.ts',
          'layout-box/index': './src/components/packages/layout-box/index.ts',
          'loading/index': './src/components/packages/loading/index.ts',
          'media/index': './src/components/packages/media/index.ts',
          'modal/index': './src/components/packages/modal/index.ts',
          'morph/index': './src/components/packages/morph/index.ts',
          'notifier/index': './src/components/packages/notifier/index.ts',
          'order/index': './src/components/packages/order/index.ts',
          'popover/index': './src/components/packages/popover/index.ts',
          'resized/index': './src/components/packages/resized/index.ts',
          'router/index': './src/components/packages/router/index.ts',
          'scroll/index': './src/components/packages/scroll/index.ts',
          'scroll-entries/index':
            './src/components/packages/scroll-entries/index.ts',
          'select/index': './src/components/packages/select/index.ts',
          'slicer/index': './src/components/packages/slicer/index.ts',
          'source/index': './src/components/packages/source/index.ts',
          'store/index': './src/components/packages/store/index.ts',
          'theme/index': './src/components/packages/theme/index.ts',
          'ticker/index': './src/components/packages/ticker/index.ts',
          'tweaker/index': './src/components/packages/tweaker/index.ts',
          'utils/index': './src/components/packages/utils/index.ts',
          'video/index': './src/components/packages/video/index.ts',
          'window-resizer/index':
            './src/components/packages/window-resizer/index.ts',
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
    ...browserSharedConfig(),
  }

  return config
}
