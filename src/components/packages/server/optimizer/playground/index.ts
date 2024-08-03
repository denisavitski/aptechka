import { prepareFiles } from '../prepareFiles'

const files = prepareFiles(
  'src/components/packages/server/optimizer/playground/source',
  'src/components/packages/server/optimizer/playground/dest'
)

console.log(files)
