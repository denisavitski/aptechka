import { resolve } from 'path'
import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export function sharedConfig() {
  const config: UserConfig = {
    plugins: [react()],
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
