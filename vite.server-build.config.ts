import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import { sharedConfig } from './vite.shared.config'

export function serverBuildConfig() {
  const config: UserConfig = {
    ...sharedConfig(),
    plugins: [
      dtsPlugin({
        include: './src/components/packages/server',
        exclude: '**/playground/**',
      }),
    ],
    build: {
      outDir: 'server-lib',
      ssr: true,
      rollupOptions: {
        input: {
          'optimizer/index':
            './src/components/packages/server/optimizer/index.ts',
          'utils/index': './src/components/packages/server/utils/index.ts',
        },
      },
    },
  }

  return config
}
