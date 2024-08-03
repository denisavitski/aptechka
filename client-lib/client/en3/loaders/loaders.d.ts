import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from '../libs/MeshoptDecoder';
import { En3GLTFLoader } from './En3GLTFLoader';
import { En3TextureLoader } from './En3TextureLoader';

export declare const loaders: {
    gltfLoader: En3GLTFLoader;
    textureLoader: En3TextureLoader;
    dracoLoader: DRACOLoader;
    ktx2Loader: KTX2Loader;
    meshoptDecoder: ReturnType<typeof MeshoptDecoder>;
};
