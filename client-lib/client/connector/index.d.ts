export type ConnectorConnectCallback<T extends Node = Node> = (node: T) => void;
export type ConnectorDisconnectCallback<T extends Node = Node> = (node: T, expired?: boolean) => void;
export interface ConnectorOptions {
    connectCallback?: ConnectorConnectCallback;
    disconnectCallback?: ConnectorDisconnectCallback;
    maxWaitSec?: number;
    unsubscribeAfterDisconnect?: boolean;
}
export declare class Connector {
    #private;
    subscribe(node: Node, options: ConnectorOptions): () => void;
    unsubscribe(options: ConnectorOptions): void;
    destroy(): void;
}
export declare const connector: Connector;
