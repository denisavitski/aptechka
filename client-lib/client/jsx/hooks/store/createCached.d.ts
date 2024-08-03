import { AsyncCached, Cached, CachedSource } from '../../../store';

export declare function createCached<Type, SourceType extends Array<CachedSource> = Array<CachedSource>>(...parameters: ConstructorParameters<typeof Cached<Type, SourceType>>): Cached<Type, SourceType>;
export declare function createAsyncCached<Type, SourceType extends Array<CachedSource> = Array<CachedSource>>(...parameters: ConstructorParameters<typeof AsyncCached<Type, SourceType>>): AsyncCached<Type, SourceType>;
