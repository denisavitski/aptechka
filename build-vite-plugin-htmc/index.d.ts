import { Plugin } from 'vite';
export interface HTMCOptions {
    assets?: 'split' | 'merge' | undefined;
    srcFolderName?: string;
    distFolderName?: string;
}
export declare function htmc(options?: HTMCOptions): Plugin<any>;
