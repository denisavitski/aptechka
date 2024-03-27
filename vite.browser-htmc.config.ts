import { UserConfig } from 'vite'
import { htmc } from './dev-vite-plugins/htmc'
import { browserSharedConfig } from './vite.browser-shared.config'

export const browserHTMCConfig: UserConfig = {
  plugins: [
    htmc({
      srcFolderName: 'dev-browser-lib',
    }),
  ],
  ...browserSharedConfig,
}
