import { Store } from '../../../store';
import { ComponentElement } from '../../ComponentElement';

export declare function _createStore<T extends Store<any, any>>(arg: T | ((e: ComponentElement | null) => T)): T;
