import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { browserSharedConfig } from './vite.shared.config'

export function clientBuildConfig() {
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
      outDir: 'client-lib',
      target: 'es2016',
      lib: {
        name: 'Aptechka',
        entry: {
          'accordion/index':
            './src/components/packages/client/accordion/index.ts',
          'animation/index':
            './src/components/packages/client/animation/index.ts',
          'attribute/index':
            './src/components/packages/client/attribute/index.ts',
          'canvas/index': './src/components/packages/client/canvas/index.ts',
          'checkbox/index':
            './src/components/packages/client/checkbox/index.ts',
          'class-linked-status/index':
            './src/components/packages/client/class-linked-status/index.ts',
          'connector/index':
            './src/components/packages/client/connector/index.ts',
          'controls/index':
            './src/components/packages/client/controls/index.ts',
          'css-property/index':
            './src/components/packages/client/css-property/index.ts',
          'css-unit-parser/index':
            './src/components/packages/client/css-unit-parser/index.ts',
          'css-value-parser/index':
            './src/components/packages/client/css-value-parser/index.ts',
          'dev/index': './src/components/packages/client/dev/index.ts',
          'device/index': './src/components/packages/client/device/index.ts',
          'element-constructor/index':
            './src/components/packages/client/element-constructor/index.ts',
          'element-resizer/index':
            './src/components/packages/client/element-resizer/index.ts',

          // > EN3
          'en3/index': './src/components/packages/client/en3/index.ts',
          'en3/helpers/index':
            './src/components/packages/client/en3/helpers/index.ts',
          'en3/libs/index':
            './src/components/packages/client/en3/libs/index.ts',
          'en3/loaders/index':
            './src/components/packages/client/en3/loaders/index.ts',
          'en3/misc/index':
            './src/components/packages/client/en3/misc/index.ts',
          'en3/utils/index':
            './src/components/packages/client/en3/utils/index.ts',
          // < EN3

          // > JSX
          'jsx/index': './src/components/packages/client/jsx/index.ts',
          'jsx/hooks/animation/index':
            './src/components/packages/client/jsx/hooks/animation/index.ts',
          'jsx/hooks/store/index':
            './src/components/packages/client/jsx/hooks/store/index.ts',
          'jsx/hooks/onAnimationFrame':
            './src/components/packages/client/jsx/hooks/onAnimationFrame.ts',
          'jsx/hooks/onElementResize':
            './src/components/packages/client/jsx/hooks/onElementResize.ts',
          'jsx/hooks/onIntersection':
            './src/components/packages/client/jsx/hooks/onIntersection.ts',
          'jsx/hooks/onWindowResize':
            './src/components/packages/client/jsx/hooks/onWindowResize.ts',
          'jsx/hooks/watchAttribute':
            './src/components/packages/client/jsx/hooks/watchAttribute.ts',
          'jsx/hooks/watchCSSProperty':
            './src/components/packages/client/jsx/hooks/watchCSSProperty.ts',
          // < JSX

          'image/index': './src/components/packages/client/image/index.ts',
          'intersector/index':
            './src/components/packages/client/intersector/index.ts',

          'ladder/index': './src/components/packages/client/ladder/index.ts',
          'layout-box/index':
            './src/components/packages/client/layout-box/index.ts',
          'loading/index': './src/components/packages/client/loading/index.ts',
          'media/index': './src/components/packages/client/media/index.ts',
          'modal/index': './src/components/packages/client/modal/index.ts',
          'morph/index': './src/components/packages/client/morph/index.ts',
          'notifier/index':
            './src/components/packages/client/notifier/index.ts',
          'order/index': './src/components/packages/client/order/index.ts',
          'pointer/index': './src/components/packages/client/pointer/index.ts',
          'popover/index': './src/components/packages/client/popover/index.ts',
          'router/index': './src/components/packages/client/router/index.ts',
          'scroll/index': './src/components/packages/client/scroll/index.ts',
          'scroll-entries/index':
            './src/components/packages/client/scroll-entries/index.ts',
          'select/index': './src/components/packages/client/select/index.ts',
          'sequence/index':
            './src/components/packages/client/sequence/index.ts',
          'slicer/index': './src/components/packages/client/slicer/index.ts',
          'source/index': './src/components/packages/client/source/index.ts',
          'store/index': './src/components/packages/client/store/index.ts',
          'svg-path-data/index':
            './src/components/packages/client/svg-path-data/index.ts',
          'theme/index': './src/components/packages/client/theme/index.ts',
          'ticker/index': './src/components/packages/client/ticker/index.ts',
          'tweaker/index': './src/components/packages/client/tweaker/index.ts',
          'utils/index': './src/components/packages/client/utils/index.ts',
          'video/index': './src/components/packages/client/video/index.ts',
          'window-resizer/index':
            './src/components/packages/client/window-resizer/index.ts',
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
