import { Texture, Vector2, WebGLRenderTarget } from 'three';
import { ShaderPass } from './ShaderPass';

export interface AdvectionParameters {
    cellScale: Vector2;
    fboSize: Vector2;
    dt: number;
    src: WebGLRenderTarget<Texture>;
    dst: WebGLRenderTarget<Texture>;
    BFECC: boolean;
}
export interface AdvectionUpdateParameters {
    dt: number;
    isBounce: boolean;
    BFECC: boolean;
}
export interface AdvectionUniforms {
    boundarySpace: Vector2;
    px: Vector2;
    fboSize: Vector2;
    velocity: Texture;
    dt: number;
    isBFECC: boolean;
}
export declare class Advection extends ShaderPass<AdvectionUniforms> {
    #private;
    constructor(parameters: AdvectionParameters);
    update(parameters: AdvectionUpdateParameters): void;
    protected init(): void;
}
