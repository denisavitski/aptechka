import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
export interface En3HTMLParameters {
    element: HTMLElement;
}
export declare class En3HTML extends CSS3DObject {
    #private;
    static destroy(): void;
    constructor(parameters: En3HTMLParameters);
}
