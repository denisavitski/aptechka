import { Mesh, Object3D } from 'three';

export declare function traverseMeshes(object: Object3D, callback: (mesh: Mesh) => void): void;
