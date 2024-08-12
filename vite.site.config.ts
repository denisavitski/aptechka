import { UserConfig } from 'vite'
import { sharedConfig } from './vite.shared.config'
import { htmc } from 'vite-plugin-htmc'

export function siteConfig() {
  const shared = sharedConfig()

  const config: UserConfig = {
    ...shared,
    plugins: [...shared.plugins!, htmc()],
  }

  return config
}
