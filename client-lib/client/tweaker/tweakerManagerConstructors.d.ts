import { Store, StoreManagerType } from '../store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';

export declare const tweakerManagerConstructors: {
    [key in StoreManagerType]: typeof TweakerStoreManagerElement<Store<any, any>>;
};
