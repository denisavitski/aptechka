import { UserConfig } from 'vite'
import { resolve } from 'path'

export function sharedConfig() {
  const config: UserConfig = {
    resolve: {
      alias: {
        '@packages': resolve(__dirname, 'src/components/packages'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
  }

  return config
}
