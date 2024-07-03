import { UserConfig } from 'vite'
import { resolve } from 'path'

export function browserSharedConfig() {
  const config: UserConfig = {
    resolve: {
      alias: {
        '@packages': resolve(__dirname, 'src/components/packages'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import { h, Fragment } from '@packages/jsx'`,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  }

  return config
}
