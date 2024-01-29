import { Ladder } from '../../ladder';
import { LayoutBox, LayoutBoxOptions } from '../../layout-box';
import { ElementOrSelector } from '../../utils';
import { Object3D, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer, WebGLRendererParameters } from 'three';
export type En3AttachedObject3D<T extends Object3D> = T & {
    userData: {
        box: LayoutBox;
    };
};
export interface En3Parameters {
    containerElement?: HTMLElement;
    webGLRendererParameters?: WebGLRendererParameters;
    maxPixelRatio?: number;
    cameraAutoUpdate?: boolean;
    cameraType?: 'perspective' | 'orthographic';
    cameraDistance?: number;
    cameraNear?: number;
    cameraFar?: number;
    cameraFov?: 'auto' | number;
}
export type En3AttachOptions = Omit<LayoutBoxOptions, 'containerElement' | 'cartesian'>;
declare class En3 {
    #private;
    get CDNVersion(): string;
    get containerElement(): HTMLElement;
    get webglRenderer(): WebGLRenderer;
    get camera(): PerspectiveCamera | OrthographicCamera;
    get scene(): Scene;
    get attachedObjects(): En3AttachedObject3D<Object3D<import("three").Object3DEventMap>>[];
    get cameraPosition(): Ladder<{
        x: number;
        y: number;
        z: number;
    }, import('../../ladder').LadderDefaultStepName>;
    get cameraRotation(): Ladder<{
        x: number;
        y: number;
        z: number;
    }, import('../../ladder').LadderDefaultStepName>;
    get width(): number;
    get height(): number;
    get pixelRatio(): number;
    get cameraDistance(): number;
    set cameraDistance(value: number);
    attachToHTMLElement<T extends Object3D>(element: ElementOrSelector, object: T, options?: En3AttachOptions): En3AttachedObject3D<T>;
    detachFromHTMLElement(object: Object3D): void;
    add<T extends Object3D<any>>(object: T, element?: ElementOrSelector, options?: En3AttachOptions): En3AttachedObject3D<T> | undefined;
    remove(object: Object3D, detach?: boolean): void;
    setup(options?: En3Parameters): void;
    destroy(): void;
    render(scene: Scene, camera: OrthographicCamera | PerspectiveCamera): void;
    onResize?(): void;
}
export declare const en3: En3;
export {};
