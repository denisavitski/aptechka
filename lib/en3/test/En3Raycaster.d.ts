import { Intersection, Object3D } from 'three';
export type En3RaycasterEventType = 'en3-pointerdown' | 'en3-pointerup' | 'en3-pointermove' | 'en3-pointerleave' | 'en3-pointerenter' | 'en3-pointermove';
export type En3RaycasterEvent = {
    type: En3RaycasterEventType;
    originalEvent: PointerEvent;
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
