import { Derived, AsyncDerived } from '../../../store';

export declare function createDerived<Type, SourceType>(...parameters: ConstructorParameters<typeof Derived<Type, SourceType>>): Derived<Type, SourceType>;
export declare function createAsyncDerived<Type, SourceType>(...parameters: ConstructorParameters<typeof AsyncDerived<Type, SourceType>>): AsyncDerived<Type, SourceType>;
