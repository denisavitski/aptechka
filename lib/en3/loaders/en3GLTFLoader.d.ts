/**
 * https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
declare class En3GLTFLoader {
    #private;
    constructor();
    get gltfLoader(): GLTFLoader;
    get dracoLoader(): DRACOLoader;
    get ktx2Loader(): KTX2Loader;
    load(...parameters: Parameters<typeof this.gltfLoader.load>): void;
}
export declare const en3GLTFLoader: En3GLTFLoader;
export {};
