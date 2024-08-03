import { Store } from '../../../store';
import { WebGLRenderTarget } from 'three';

export interface SimulationFBOS {
    vel0: WebGLRenderTarget;
    vel1: WebGLRenderTarget;
    velViscous0: WebGLRenderTarget;
    velViscous1: WebGLRenderTarget;
    div: WebGLRenderTarget;
    pressure0: WebGLRenderTarget;
    pressure1: WebGLRenderTarget;
}
export declare class Simulation {
    #private;
    constructor();
    get parameters(): {
        isViscous: Store<boolean, keyof import('../../../store').StoreManagers>;
        viscous: Store<number, keyof import('../../../store').StoreManagers>;
        iterationsViscous: Store<number, keyof import('../../../store').StoreManagers>;
        pointerForce: Store<number, keyof import('../../../store').StoreManagers>;
        pointerSize: Store<number, keyof import('../../../store').StoreManagers>;
        dt: Store<number, keyof import('../../../store').StoreManagers>;
        iterationsPoisson: Store<number, keyof import('../../../store').StoreManagers>;
        resolution: Store<number, keyof import('../../../store').StoreManagers>;
        isBounce: Store<boolean, keyof import('../../../store').StoreManagers>;
        BFECC: Store<boolean, keyof import('../../../store').StoreManagers>;
    };
    get fbos(): SimulationFBOS;
    resize(): void;
    update(): void;
    dispose(): void;
    protected init(): void;
}
