// vite.config.js
import { defineConfig } from 'vite'
import { siteConfig } from './vite.site.config'
import { libConfig } from './vite.lib.config'

export default defineConfig((e) => {
  if (e.mode === 'lib') {
    return libConfig()
  }

  return siteConfig()
})
