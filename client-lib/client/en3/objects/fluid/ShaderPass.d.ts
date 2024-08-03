import { Camera, Scene, ShaderMaterialParameters, Texture, WebGLRenderTarget } from 'three';

export interface ShaderPassParameters<Uniforms extends ShaderPassDefaultUniforms = ShaderPassDefaultUniforms> {
    material?: Omit<ShaderMaterialParameters, 'uniforms'> & {
        uniforms?: Uniforms;
    };
    output: WebGLRenderTarget<Texture>;
}
export type ShaderPassDefaultUniforms = {
    [key: string]: any;
};
export declare class ShaderPass<Uniforms extends ShaderPassDefaultUniforms = ShaderPassDefaultUniforms> {
    #private;
    output: WebGLRenderTarget<Texture>;
    constructor(parameters: ShaderPassParameters<Uniforms>);
    get scene(): Scene;
    get camera(): Camera;
    get uniforms(): { [K in keyof Uniforms]: {
        value: Uniforms[K];
    }; };
    update(..._args: any[]): void;
    dispose(): void;
    protected init(..._args: any[]): void;
}
