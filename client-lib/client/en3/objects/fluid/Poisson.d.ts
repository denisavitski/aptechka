import { Texture, Vector2, WebGLRenderTarget } from 'three';
import { ShaderPass } from './ShaderPass';

export interface PoissonParameters {
    boundarySpace: Vector2;
    dst: WebGLRenderTarget<Texture>;
    dst_: WebGLRenderTarget<Texture>;
    src: WebGLRenderTarget<Texture>;
    cellScale: Vector2;
}
export interface PoissonUpdateParameters {
    iterations: number;
}
export interface PoissonUniforms {
    boundarySpace: Vector2;
    pressure: Texture;
    divergence: Texture;
    px: Vector2;
}
export declare class Poisson extends ShaderPass<PoissonUniforms> {
    #private;
    constructor(parameters: PoissonParameters);
    update(parameters: PoissonUpdateParameters): WebGLRenderTarget<Texture>;
}
