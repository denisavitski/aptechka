import { optimizer } from '../optimizer'

optimizer({
  sourceFolder: 'src/components/packages/server/optimizer/playground/source',
  destinationFolder: 'src/components/packages/server/optimizer/playground/dest',
  settings: {
    image: (p) => {
      return {
        placeholder: true,
        webp: true,
        path:
          p.destinationPath.split('.').slice(0, -1).join('.') +
          '.kek.' +
          p.destinationPath.split('.').slice(-1).join('.'),
      }
    },
    video: () => {
      return {
        quality: 50,
        scale: 0.5,
      }
    },
    favicon: (parameters) => {
      return {
        options: {
          appDescription: 'HEH',
        },
      }
    },
  },
})
