import { Dot2D } from '../../utils';
import { Texture } from 'three';

/**
 * texture.matrixAutoUpdate must be false
 */
export declare function coverTexture(texture: Texture, planeSize: Dot2D, aspect?: number): void;
