import { extname } from 'path'
import { optimizer } from '../optimizer'

optimizer({
  sourceFolder: 'src/components/packages/server/optimizer/playground/source',
  destinationFolder: 'src/components/packages/server/optimizer/playground/dest',
  settings: {
    image: (p) => {
      return {
        forceJPG: true,
        placeholder: true,
        webp: true,
        path:
          p.destinationPath.split('.').slice(0, -1).join('.') +
          '.qwerty.' +
          p.destinationPath.split('.').slice(-1).join('.'),
      }
    },
    video: () => {
      return {
        scale: 0.5,
      }
    },
    favicon: (parameters) => {
      return {
        appDescription: 'qwerty',
      }
    },
    sprite: () => {
      return {
        name: 'qwerty',
      }
    },
    sequence: () => {
      return {
        fps: 2,
      }
    },
  },
})
