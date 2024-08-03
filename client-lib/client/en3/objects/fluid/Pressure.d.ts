import { Texture, Vector2, WebGLRenderTarget } from 'three';
import { ShaderPass } from './ShaderPass';

export interface PressureParameters {
    boundarySpace: Vector2;
    srcP: WebGLRenderTarget<Texture>;
    srcV: WebGLRenderTarget<Texture>;
    dst: WebGLRenderTarget<Texture>;
    cellScale: Vector2;
    dt: number;
}
export interface PressureUpdateParameters {
    vel: WebGLRenderTarget<Texture>;
    pressure: WebGLRenderTarget<Texture>;
}
export interface PressureUniforms {
    boundarySpace: Vector2;
    pressure: Texture;
    velocity: Texture;
    px: Vector2;
    dt: number;
}
export declare class Pressure extends ShaderPass<PressureUniforms> {
    constructor(parameters: PressureParameters);
    update(parameters: PressureUpdateParameters): void;
}
