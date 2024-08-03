import { BufferGeometry, Material, Mesh, Texture } from 'three';
import { En3SourceManager, En3SourceManagerLoader, En3SourceManagerParameters } from '../misc/En3SourceManager';
import { En3SourceConsumer } from './En3SourceConsumer';

export type En3ImageLikeMaterial<TTexture extends Texture> = Material & {
    map: TTexture | null;
};
export type En3ImageLikeFit = 'cover' | 'contain';
export interface En3ImageLikeParameters<TTexture extends Texture, TMaterial extends En3ImageLikeMaterial<TTexture>> extends En3SourceManagerParameters<TTexture> {
    width?: number;
    height?: number;
    round?: number;
    segments?: number;
    material?: TMaterial;
    fit?: En3ImageLikeFit;
    loader: En3SourceManagerLoader<TTexture>;
}
export declare class En3ImageLike<TTexture extends Texture, TMaterial extends En3ImageLikeMaterial<TTexture>> extends Mesh<BufferGeometry, TMaterial> implements En3SourceConsumer<TTexture> {
    #private;
    constructor(parameters: En3ImageLikeParameters<TTexture, TMaterial>);
    get sourceManager(): En3SourceManager<TTexture>;
    destroy(): void;
    updateTexture(): void;
    protected onCoverResize(texture: TTexture): void;
}
