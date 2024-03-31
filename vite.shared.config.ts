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
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  }

  return config
}
