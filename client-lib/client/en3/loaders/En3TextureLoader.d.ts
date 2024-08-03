import { TextureLoader } from 'three';

export declare class En3TextureLoader {
    #private;
    constructor();
    load(...parameters: Parameters<TextureLoader['load']>): any;
    loadSync(...parameters: Parameters<TextureLoader['loadAsync']>): Promise<any>;
}
