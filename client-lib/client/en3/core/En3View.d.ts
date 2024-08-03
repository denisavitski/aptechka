import { LayoutBox, LayoutBoxOptions } from '../../layout-box';
import { ElementOrSelector } from '../../utils';
import { Object3D, OrthographicCamera, PerspectiveCamera, Scene } from 'three';

export interface En3ViewOptions {
    cameraType?: 'perspective' | 'orthographic';
    cameraDistance?: number;
    cameraNear?: number;
    cameraFar?: number;
    cameraFov?: 'auto' | number;
    sizeElement?: ElementOrSelector<HTMLElement>;
    beforeRender?: () => void;
}
export type En3AttachedObject3D<T extends Object3D> = T & {
    userData: {
        box: LayoutBox;
    };
};
export type En3AttachOptions = Omit<LayoutBoxOptions, 'containerElement' | 'cartesian' | 'scrollStep'>;
export type En3ViewBeforeRenderCallback = () => void;
export declare class En3View {
    #private;
    beforeRenderCallback: En3ViewBeforeRenderCallback | undefined;
    constructor(name: string, options?: En3ViewOptions);
    get name(): string;
    get camera(): PerspectiveCamera | OrthographicCamera;
    get scene(): Scene;
    get box(): LayoutBox;
    get cameraDistance(): number;
    set cameraDistance(value: number);
    get sizeElement(): HTMLElement;
    get isClipped(): boolean;
    resize(): void;
    destroy(): void;
    attachToHTMLElement<T extends Object3D>(element: ElementOrSelector<HTMLElement>, object: T, options?: En3AttachOptions): En3AttachedObject3D<T>;
    detachFromHTMLElement(object: Object3D): void;
    add<T extends Object3D<any>>(object: T): T;
    add<T extends Object3D<any>>(object: T, element: ElementOrSelector<HTMLElement>, options?: En3AttachOptions): En3AttachedObject3D<T>;
    remove(object: Object3D, detach?: boolean): void;
}
