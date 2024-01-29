import { VideoTexture } from 'three';
import { En3ImageLike, En3ImageLikeMaterial, En3ImageLikeParameters } from './En3ImageLike';
export interface En3VideoParameters<TMaterial extends En3ImageLikeMaterial<VideoTexture>> extends Omit<En3ImageLikeParameters<VideoTexture, TMaterial>, 'loader'> {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
}
export declare class En3Video<TMaterial extends En3ImageLikeMaterial<VideoTexture>> extends En3ImageLike<VideoTexture, TMaterial> {
    #private;
    constructor(parameters: En3VideoParameters<TMaterial>);
    protected onCoverResize(texture: VideoTexture): void;
}
