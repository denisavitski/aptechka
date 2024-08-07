import { Texture } from 'three'

import {
  En3ImageLike,
  En3ImageLikeMaterial,
  En3ImageLikeParameters,
} from './En3ImageLike'
import { loaders } from '../loaders'

export interface En3ImageParameters<
  TMaterial extends En3ImageLikeMaterial<Texture>
> extends Omit<En3ImageLikeParameters<Texture, TMaterial>, 'loader'> {}

export class En3Image<
  TMaterial extends En3ImageLikeMaterial<Texture>
> extends En3ImageLike<Texture, TMaterial> {
  constructor(parameters: En3ImageParameters<TMaterial>) {
    super({
      ...parameters,
      loader: loaders.textureLoader,
    })
  }
}
