import { Material, Mesh, PlaneGeometry, Texture } from 'three';
import { En3SourceManager, En3SourceManagerLoader, En3SourceManagerParameters } from '../attachments/En3SourceManager';
import { En3SourceConsumer } from './En3SourceConsumer';
export type En3ImageLikeMaterial<TTexture extends Texture> = Material & {
    map: TTexture | null;
};
export interface En3ImageLikeParameters<TTexture extends Texture, TMaterial extends En3ImageLikeMaterial<TTexture>> extends En3SourceManagerParameters<TTexture> {
    width?: number;
    height?: number;
    widthSegments?: number;
    heightSegments?: number;
    material?: TMaterial;
    cover?: boolean;
    loader: En3SourceManagerLoader<TTexture>;
}
export declare class En3ImageLike<TTexture extends Texture, TMaterial extends En3ImageLikeMaterial<TTexture>> extends Mesh<PlaneGeometry, TMaterial> implements En3SourceConsumer<TTexture> {
    #private;
    constructor(parameters: En3ImageLikeParameters<TTexture, TMaterial>);
    get sourceManager(): En3SourceManager<TTexture>;
    updateTexture(): void;
    protected onCoverResize(texture: TTexture): void;
}
