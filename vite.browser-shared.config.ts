import { UserConfig } from 'vite'
import { resolve } from 'path'

export const browserSharedConfig: UserConfig = {
  resolve: {
    alias: {
      '@packages': resolve(__dirname, 'dev-browser-lib/components/packages'),
      '@assets': resolve(__dirname, 'dev-browser-lib/assets'),
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
