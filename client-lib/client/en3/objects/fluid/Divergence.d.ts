import { Texture, Vector2, WebGLRenderTarget } from 'three';
import { ShaderPass } from './ShaderPass';

export interface DivergenceParameters {
    boundarySpace: Vector2;
    src: WebGLRenderTarget<Texture>;
    cellScale: Vector2;
    dt: number;
    dst: WebGLRenderTarget<Texture>;
}
export interface DivergenceUpdateParameters {
    vel: WebGLRenderTarget<Texture>;
}
export interface DivergenceUniforms {
    boundarySpace: Vector2;
    velocity: Texture;
    px: Vector2;
    dt: number;
}
export declare class Divergence extends ShaderPass<DivergenceUniforms> {
    constructor(parameters: DivergenceParameters);
    update(parameters: DivergenceUpdateParameters): void;
}
