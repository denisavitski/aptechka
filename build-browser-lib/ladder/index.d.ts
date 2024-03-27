import { Store } from '../store';
export type LadderDefaultStepName = number | string;
export type LadderOperation = '+' | '*' | '/' | '-';
export type LadderSteps<K, T extends LadderDefaultValueType = LadderDefaultValueType> = Map<K, LadderStep<T>>;
export type LadderDefaultValueType = {
    [key: string]: number;
};
interface LadderStepParameters<T extends LadderDefaultValueType = LadderDefaultValueType> {
    operation: LadderOperation;
    value: T;
    damping?: number;
}
declare class LadderStep<T extends LadderDefaultValueType = LadderDefaultValueType> {
    #private;
    constructor(parameters: LadderStepParameters<T>);
    get operation(): LadderOperation;
    get value(): T;
    set value(value: T);
    get damping(): number;
    set damping(value: number);
    update(elapsed: number): boolean;
}
export declare class Ladder<V extends LadderDefaultValueType = LadderDefaultValueType, K extends LadderDefaultStepName = LadderDefaultStepName> extends Store<V> {
    #private;
    constructor(base: V);
    get base(): V;
    get steps(): LadderSteps<K, V>;
    close(): void;
    bind(sub: V): void;
    unbind(sub: V): void;
    deleteStep(stepName: K): void;
    getStepValue(stepName: K): V;
    setStep(stepName: K, operation: LadderOperation, setValue: Partial<V>, damping?: number): void;
    calculate(): void;
}
export {};
