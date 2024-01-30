import { Resource, ResourceFetcher, ResourceOptions } from './Resource';
export interface СumulativeResourceOptions<T> extends ResourceOptions<T> {
    interval?: number;
}
export declare class СumulativeResource<T> extends Resource<T> {
    #private;
    constructor(defaultValue: T, fetcher: ResourceFetcher<T>, interval?: number);
    get step(): number;
    startAccumulating(): void;
    stopAccumulating(): void;
    close(): void;
}
