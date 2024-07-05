import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import type { MeshoptDecoder } from '../libs/MeshoptDecoder'
import type { En3GLTFLoader } from './_En3GLTFLoader'
import type { En3TextureLoader } from './_En3TextureLoader'

export const loaders = {
  gltfLoader: null! as En3GLTFLoader,
  textureLoader: null! as En3TextureLoader,
  dracoLoader: null! as DRACOLoader,
  ktx2Loader: null! as KTX2Loader,
  meshoptDecoder: null! as ReturnType<typeof MeshoptDecoder>,
}
