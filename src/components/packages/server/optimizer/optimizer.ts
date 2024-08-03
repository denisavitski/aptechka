import { clear } from './clear'
import { inputFiles, InputFilesParameters } from './inputFiles'
import { optimize, OptimizeOptions } from './optimize'
import { outputFiles } from './outputFiles'

export type OptimizerParameters = InputFilesParameters & OptimizeOptions

export async function optimizer(parameters: OptimizerParameters) {
  await clear(parameters.destinationFolder)

  const input = await inputFiles(parameters)

  const optimized = await optimize(input, parameters)

  await outputFiles(optimized)
}
