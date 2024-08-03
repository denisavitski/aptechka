import { StoreManagerType, Store } from '../../../store';

export declare function createStore<StoreType = unknown, StoreManager extends StoreManagerType = StoreManagerType>(...parameters: ConstructorParameters<typeof Store<StoreType, StoreManager>>): Store<StoreType, StoreManager>;
