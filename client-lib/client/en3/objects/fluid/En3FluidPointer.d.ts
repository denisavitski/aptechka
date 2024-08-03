import * as THREE from 'three';
declare class En3FluidPointer {
    #private;
    disabled: boolean;
    init(): void;
    dispose(): void;
    get coords(): THREE.Vector2;
    get diff(): THREE.Vector2;
    updateCoords(x?: number, y?: number): void;
    update(): void;
}
export declare const en3FluidPointer: En3FluidPointer;
export {};
