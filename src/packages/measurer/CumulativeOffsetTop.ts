import { getCumulativeOffsetTop } from '$packages/utils'
import { Measurer } from './Meaurer'

export class CumulativeOffsetTop extends Measurer {
  protected handleResize() {
    return getCumulativeOffsetTop(this.element)
  }
}
