import { Intersection, Object3D } from 'three';

export type En3RaycasterEventType = 'pointerDown' | 'pointerUp' | 'pointerMove' | 'pointerLeave' | 'pointerEnter' | 'pointerMove';
export type En3RaycasterEvent = {
    type: En3RaycasterEventType;
    originalEvent: PointerEvent;
    target: Object3D;
} & Intersection<Object3D>;
export interface En3RaycasterOptions {
    targetName?: string;
    eventDispatcher?: Object3D;
    propagation?: boolean;
}
export type En3RaycasterCallback = (event: En3RaycasterEvent) => void;
export declare class En3Raycaster {
    #private;
    constructor();
    destroy(): void;
    add(object3D: Object3D, options?: En3RaycasterOptions): void;
    remove(object3D: Object3D): void;
}
