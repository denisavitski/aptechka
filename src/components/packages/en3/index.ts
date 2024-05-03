export { en3, type En3AttachedObject3D, type En3Parameters } from './core/en3'

export { en3TextureLoader } from './loaders/en3TextureLoader'
export { en3GLTFLoader } from './loaders/en3GLTFLoader'

export { En3Clip } from './objects/En3Clip'

export { En3ClipHelpers } from './objects/En3ClipHelpers'

export { En3GLTF } from './objects/En3GLTF'

export {
  En3ImageLike,
  type En3ImageLikeParameters,
  type En3ImageLikeMaterial,
} from './objects/En3ImageLike'

export { En3Image, type En3ImageParameters } from './objects/En3Image'

export { En3Video, type En3VideoParameters } from './objects/En3Video'

export { type En3SourceConsumer } from './objects/En3SourceConsumer'

export {
  En3SourceManager,
  type En3SourceManagerParameters,
  type En3SourceManagerFullParameters,
  type En3SourceManagerLoader,
} from './attachments/En3SourceManager'

export { dispose } from './utils/dispose'
export { traverseMeshes } from './utils/traverseMeshes'
export { traverseMaterials } from './utils/traverseMaterials'
export { coverTexture } from './utils/coverTexture'
export { getCurrentViewport } from './utils/getCurrentViewport'

export { En3HTML, type En3HTMLParameters } from './test/En3HTML'

export {
  En3Raycaster,
  type En3RaycasterEventType,
  type En3RaycasterEvent,
  type En3RaycasterOptions,
  type En3RaycasterCallback,
} from './core/En3Raycaster'

export {
  En3ModifiedMaterial,
  type En3ModifiedMaterialParameters,
  type En3VertexChunk,
  type En3FragmentChunk,
} from './test/En3ModifiedMaterial'
