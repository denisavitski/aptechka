import { Resource } from '../../../store';

export declare function createResource<StoreType>(...parameters: ConstructorParameters<typeof Resource<StoreType>>): Resource<StoreType>;
