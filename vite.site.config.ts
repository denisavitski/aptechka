import { UserConfig } from 'vite'
import { browserSharedConfig } from './vite.shared.config'
import { htmc } from 'vite-plugin-htmc'

export function siteConfig() {
  const config: UserConfig = {
    plugins: [htmc()],
    ...browserSharedConfig(),
  }

  return config
}
