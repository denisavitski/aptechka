import { UserConfig } from 'vite'
import { htmc } from 'vite-plugin-htmc'
import { sharedConfig } from './vite.shared.config'

export function siteConfig() {
  const shared = sharedConfig()

  const config: UserConfig = {
    ...shared,
    plugins: [...shared.plugins!, htmc()],
  }

  return config
}
