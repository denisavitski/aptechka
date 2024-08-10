import { UserConfig } from 'vite'
import { sharedConfig } from './vite.shared.config'

export function clientSharedConfig() {
  const config: UserConfig = {
    ...sharedConfig(),
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  }

  return config
}
