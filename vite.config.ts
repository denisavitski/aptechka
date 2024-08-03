// vite.config.js
import { defineConfig } from 'vite'
import { siteConfig } from './vite.site.config'
import { clientBuildConfig } from './vite.client-build.config'
import { serverBuildConfig } from './vite.server-build.config'

export default defineConfig((e) => {
  if (e.mode === 'client-lib') {
    return clientBuildConfig()
  } else if (e.mode === 'server-lib') {
    return serverBuildConfig()
  }

  return siteConfig()
})
