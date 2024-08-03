import { Vector3 } from 'three';

export declare function getCurrentViewport(target: Vector3 | [number, number, number], viewName?: string): {
    width: number;
    height: number;
    factor: number;
    distance: number;
    aspect: number;
};
