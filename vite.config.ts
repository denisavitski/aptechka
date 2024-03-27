// vite.config.js
import { defineConfig } from 'vite'
import { siteConfig } from './vite.site.config'
import { buildConfig } from './vite.build.config'

export default defineConfig((e) => {
  if (e.mode === 'lib') {
    return buildConfig()
  }

  return siteConfig()
})
