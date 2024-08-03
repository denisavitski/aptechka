import { Texture, Vector2, WebGLRenderTarget } from 'three';
import { ShaderPass } from './ShaderPass';

export interface ExternalForceParameters {
    cellScale: Vector2;
    pointerSize: number;
    dst: WebGLRenderTarget<Texture>;
}
export interface ExternalForceUpdateParameters {
    cellScale: Vector2;
    pointerForce: number;
    pointerSize: number;
}
export declare class ExternalForce extends ShaderPass {
    #private;
    constructor(parameters: ExternalForceParameters);
    update(parameters: ExternalForceUpdateParameters): void;
    protected init(parameters: ExternalForceParameters): void;
}
