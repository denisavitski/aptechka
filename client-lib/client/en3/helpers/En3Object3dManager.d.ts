import { Object3D } from 'three';

export interface En3Object3dManagerOptions {
    step?: number;
}
export declare class En3Object3dManager {
    #private;
    constructor(object3d: Object3D, options?: En3Object3dManagerOptions);
    get object3d(): Object3D<import('three').Object3DEventMap>;
    get helpers(): Object3D<import('three').Object3DEventMap>[];
    get raycasterTarget(): Object3D<import('three').Object3DEventMap>;
    destroy(): void;
    save(): void;
}
