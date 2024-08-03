import { inputFiles } from '../inputFiles'

const files = inputFiles({
  sourceFolder: 'src/components/packages/server/optimizer/playground/source',
  destinationFolder: 'src/components/packages/server/optimizer/playground/dest',
})

console.log(files)
