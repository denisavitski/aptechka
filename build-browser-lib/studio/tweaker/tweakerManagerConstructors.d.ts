import { StoreManagerType } from '../../store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';
export declare const tweakerManagerConstructors: {
    [key in StoreManagerType]: typeof TweakerStoreManagerElement<any, any>;
};
