import { Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { En3SourceManager, En3SourceManagerParameters } from '../misc/En3SourceManager';
import { En3SourceConsumer } from './En3SourceConsumer';

export declare class En3GLTF extends Group implements En3SourceConsumer<GLTF> {
    #private;
    constructor(parameters: En3SourceManagerParameters<GLTF>);
    get sourceManager(): En3SourceManager<GLTF>;
    destroy(): void;
}
