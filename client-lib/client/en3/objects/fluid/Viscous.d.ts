import { ShaderPass } from './ShaderPass';
import { Texture, Vector2, WebGLRenderTarget } from 'three';

export interface ViscousParameters {
    boundarySpace: Vector2;
    src: WebGLRenderTarget<Texture>;
    dst_: WebGLRenderTarget<Texture>;
    viscous: number;
    cellScale: Vector2;
    dt: number;
    dst: WebGLRenderTarget<Texture>;
}
export interface ViscousUpdateParameters {
    viscous: number;
    iterations: number;
    dt: number;
}
export interface ViscousUniforms {
    boundarySpace: Vector2;
    velocity: Texture;
    velocity_new: Texture;
    v: number;
    px: Vector2;
    dt: number;
}
export declare class Viscous extends ShaderPass<ViscousUniforms> {
    #private;
    constructor(parameters: ViscousParameters);
    update(parameters: ViscousUpdateParameters): WebGLRenderTarget<Texture>;
}
