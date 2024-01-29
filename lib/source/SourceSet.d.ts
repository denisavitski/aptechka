import { Source } from './SourceClass';
export type SourceSetMediaSources = Array<Source>;
export type SourceSetMediaBucket = Map<string, SourceSetMediaSources>;
export declare class SourceSet {
    #private;
    constructor(sourceSet: string | Array<string>);
    get mediaBuckets(): SourceSetMediaBucket;
}
