import { resolve } from 'path'
import { UserConfig } from 'vite'

export function sharedConfig() {
  const config: UserConfig = {
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
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
