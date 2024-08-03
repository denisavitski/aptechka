import { Store } from '../../../store';

export declare function onStoreChange<S extends Store<any, any>>(store: S, callback: Parameters<S['subscribe']>['0']): void;
