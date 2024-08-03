import { clear } from './clear'
import { inputFiles, InputFilesParameters } from './inputFiles'
import { optimize } from './optimize'
import { outputFiles } from './outputFiles'

export async function optimizer(parameters: InputFilesParameters) {
  await clear(parameters.destinationFolder)

  const input = await inputFiles(parameters)

  const optimized = await optimize(input)

  await outputFiles(optimized)
}
