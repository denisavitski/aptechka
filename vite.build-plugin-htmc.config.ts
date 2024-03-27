import { UserConfig, defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

export const pluginHTMCConfig: UserConfig = {
  plugins: [
    dtsPlugin({
      include: ['./dev-vite-plugins/htmc'],
    }),
  ],
  build: {
    ssr: './dev-vite-plugins/htmc/index.ts',
    outDir: 'build-vite-plugin-htmc',
  },
}
