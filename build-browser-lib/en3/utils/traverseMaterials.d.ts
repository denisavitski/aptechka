import { Material, Object3D } from 'three';
export declare function traverseMaterials(object: Object3D, callback: (material: Material) => void): void;
