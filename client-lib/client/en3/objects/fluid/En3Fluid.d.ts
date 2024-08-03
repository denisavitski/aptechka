import { Mesh, PlaneGeometry, RawShaderMaterial } from 'three';
import { Store } from '../../../store';

export declare class En3Fluid extends Mesh<PlaneGeometry, RawShaderMaterial> {
    #private;
    colorTweenDuration: number;
    constructor();
    get backgroundColor(): Store<string, keyof import('../../../store').StoreManagers>;
    get backgroundMixThreshold(): Store<number, keyof import('../../../store').StoreManagers>;
    get backgroundOpacity(): Store<number, keyof import('../../../store').StoreManagers>;
    get fluidColor(): Store<string, keyof import('../../../store').StoreManagers>;
    get fluidOpacity(): Store<number, keyof import('../../../store').StoreManagers>;
    resize(): void;
    update(): void;
    dispose(): void;
}
