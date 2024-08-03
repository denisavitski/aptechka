import { UserConfig } from 'vite'
import { sharedConfig } from './vite.shared.config'

export function clientSharedConfig() {
  const config: UserConfig = {
    ...sharedConfig(),
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import { h, Fragment } from '@packages/client/jsx'`,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  }

  return config
}
