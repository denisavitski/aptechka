import { ElementOrSelector } from '../../utils';
import { WebGLRenderer, WebGLRendererParameters } from 'three';
import { En3View, En3ViewOptions } from './En3View';
import { En3Raycaster } from './En3Raycaster';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

export interface En3Options {
    webGLRendererParameters?: WebGLRendererParameters;
    maxPixelRatio?: number;
    containerElement?: ElementOrSelector<HTMLElement>;
    view?: En3ViewOptions;
    cacheAssets?: boolean;
    zIndex?: number;
    composer?: typeof EffectComposer;
}
declare class En3 {
    #private;
    get CDNVersion(): string;
    get containerElement(): HTMLElement;
    get webglRenderer(): WebGLRenderer;
    get raycaster(): En3Raycaster;
    get views(): Map<string, En3View>;
    get view(): En3View;
    get camera(): import('three').PerspectiveCamera | import('three').OrthographicCamera;
    get scene(): import('three').Scene;
    get width(): number;
    get height(): number;
    get pixelRatio(): number;
    get cacheAssets(): boolean;
    get composer(): EffectComposer;
    setup(options?: En3Options): void;
    destroy(): void;
    createView(viewName: string, viewOptions?: En3ViewOptions): En3View;
    getView(viewName: string): En3View;
    destroyView(viewName: string): void;
    render(view: En3View): void;
}
export declare const en3: En3;
export {};
