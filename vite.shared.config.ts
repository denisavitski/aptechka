import { resolve } from 'path'
import { UserConfig } from 'vite'
import { aptechkaVite } from './src/components/packages/jsx/plugins/vite'

export function sharedConfig() {
  const config: UserConfig = {
    plugins: [aptechkaVite({ __dev: true })],
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
