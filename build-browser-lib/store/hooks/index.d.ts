import { StoreManagerType, StoreEntry, Store, Derived, DerivedArray, Composed, Resource } from '..';
export declare function createStore<StoreType = unknown, StoreManager extends StoreManagerType = StoreManagerType, Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>>(...parameters: ConstructorParameters<typeof Store<StoreType, StoreManager, Entry>>): Store<StoreType, StoreManager, StoreEntry<StoreType>>;
export declare function createDerived<DerivedType, StoreType>(...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>): Derived<DerivedType, StoreType>;
export declare function createDerivedArray<DerivedType, StoreType extends Array<any> = Array<any>>(...parameters: ConstructorParameters<typeof DerivedArray<DerivedType, StoreType>>): DerivedArray<DerivedType, StoreType>;
export declare function createComposed<ComposedType>(...parameters: ConstructorParameters<typeof Composed<ComposedType>>): Composed<ComposedType>;
export declare function createResource<StoreType>(...parameters: ConstructorParameters<typeof Resource<StoreType>>): Resource<StoreType>;
