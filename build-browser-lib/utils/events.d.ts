export declare function dispatchSizeChangeEvent(node: Node): void;
declare global {
    interface HTMLElementEventMap {
        sizeChange: CustomEvent;
    }
}
