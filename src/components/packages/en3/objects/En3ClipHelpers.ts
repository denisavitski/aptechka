import { Group, PlaneHelper } from 'three'
import { En3Clip } from './En3Clip'

export class En3ClipHelpers extends Group {
  constructor(clip: En3Clip, size = 500) {
    super()

    this.add(new PlaneHelper(clip.planes[0], size, 0xff0000))
    this.add(new PlaneHelper(clip.planes[1], size, 0xff0000))
    this.add(new PlaneHelper(clip.planes[2], size, 0xff0000))
    this.add(new PlaneHelper(clip.planes[3], size, 0xff0000))
  }
}
