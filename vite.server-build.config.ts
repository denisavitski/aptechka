import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

export function serverBuildConfig() {
  const config: UserConfig = {
    plugins: [
      dtsPlugin({
        include: 'src/components/packages/server',
      }),
    ],
    build: {
      outDir: 'server-lib',
      ssr: true,
      rollupOptions: {
        input: {
          'optimizer/index':
            './src/components/packages/server/optimizer/index.ts',
        },
      },
    },
  }

  return config
}
