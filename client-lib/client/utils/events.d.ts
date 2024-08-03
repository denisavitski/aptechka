export declare function dispatchSizeChangeEvent(node: Node): void;
export declare function dispatchBeforeSizeChangeEvent(node: Node): void;
declare global {
    interface HTMLElementEventMap {
        sizeChange: CustomEvent;
        beforeSizeChange: CustomEvent;
    }
}
