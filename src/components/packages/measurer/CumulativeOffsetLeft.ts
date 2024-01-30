import { getCumulativeOffsetLeft } from '@packages/utils'
import { Measurer } from './Meaurer'

export class CumulativeOffsetLeft extends Measurer {
  protected handleResize() {
    return getCumulativeOffsetLeft(this.element)
  }
}
