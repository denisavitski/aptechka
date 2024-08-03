import { AsyncDerivedArray, DerivedArray } from '../../../store';

export declare function createDerivedArray<DerivedType, StoreType extends Array<any> = Array<any>>(...parameters: ConstructorParameters<typeof DerivedArray<DerivedType, StoreType>>): DerivedArray<DerivedType, StoreType>;
export declare function createAsyncDerivedArray<DerivedType, StoreType extends Array<any> = Array<any>>(...parameters: ConstructorParameters<typeof AsyncDerivedArray<DerivedType, StoreType>>): AsyncDerivedArray<DerivedType, StoreType>;
