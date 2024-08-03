import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export declare class En3GLTFLoader {
    #private;
    get gltfLoader(): GLTFLoader;
    setLoaders(options?: {
        draco?: boolean | string | null;
        ktx2?: boolean | string | null;
        meshopt?: boolean;
    }): void;
    load(...parameters: Parameters<typeof this.gltfLoader.load>): void;
}
