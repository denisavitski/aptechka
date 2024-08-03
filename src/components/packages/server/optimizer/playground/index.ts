import { clear } from '../clear'
import { inputFiles } from '../inputFiles'
import { optimize } from '../optimize'
import { outputFiles } from '../outputFiles'

await clear('src/components/packages/server/optimizer/playground/dest')

const input = await inputFiles({
  sourceFolder: 'src/components/packages/server/optimizer/playground/source',
  destinationFolder: 'src/components/packages/server/optimizer/playground/dest',
  settings: {
    image: () => {
      return {
        placeholder: true,
        webp: true,
      }
    },
    video: () => {
      return {
        quality: 50,
        scale: 0.5,
      }
    },
  },
})

const optimized = await optimize(input)

await outputFiles(optimized)
