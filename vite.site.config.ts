import { UserConfig } from 'vite'
import { clientSharedConfig } from './vite.client-shared.config'
import { htmc } from 'vite-plugin-htmc'

export function siteConfig() {
  const config: UserConfig = {
    plugins: [htmc()],
    ...clientSharedConfig(),
  }

  return config
}
