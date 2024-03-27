// vite.config.js
import { defineConfig } from 'vite'
import { browserLibConfig } from './vite.build-browser-lib.config'
import { browserHTMCConfig } from './vite.browser-htmc.config'
import { pluginHTMCConfig } from './vite.build-plugin-htmc.config'

export default defineConfig((e) => {
  if (e.mode === 'browser-lib') {
    return browserLibConfig
  } else if (e.mode === 'browser-htmc') {
    return browserHTMCConfig
  } else if (e.mode === 'plugin-htmc') {
    return pluginHTMCConfig
  } else {
    return {}
  }
})
