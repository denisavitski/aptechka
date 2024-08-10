import { UserConfig } from 'vite'
import { sharedConfig } from './vite.shared.config'
import { htmc } from 'vite-plugin-htmc'

export function siteConfig() {
  const config: UserConfig = {
    plugins: [htmc()],
    ...sharedConfig(),
  }

  return config
}
