import { resolve } from 'path'
import { UserConfig } from 'vite'

export function sharedConfig() {
  const config: UserConfig = {
    plugins: [],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import { h, Fragment } from '@packages/jsx'`,
    },
    resolve: {
      alias: {
        '@packages': resolve(__dirname, 'src/components/packages'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
  }

  return config
}
