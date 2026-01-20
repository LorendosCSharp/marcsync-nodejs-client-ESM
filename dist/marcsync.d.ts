import { Collection } from "./Collection.js";
import { BaseEntry, Entry, EntryData } from "./Entry.js";
export declare class Client {
    private _accessToken;
    private _subscriptions;
    /**
     *
     * @param accessToken - The access token to use for communication with MarcSync
     * @returns A new instance of the MarcSync client
     *
     */
    constructor(accessToken: string);
    /**
     *
     * @param collectionName - The name of the collection to use
     * @returns A new instance of the MarcSync collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
    */
    getCollection<T extends EntryData = EntryData>(collectionName: string): Collection<T>;
    /**
     *
     * @param collectionName - The name of the collection to use
     * @returns A new instance of the MarcSync collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.fetchCollection("my-collection");
     *
     * @remarks
     * This method is useful if you want to fetch the collection from the server to check if it exists before using it.
     *
    */
    fetchCollection<T extends EntryData = EntryData>(collectionName: string): Promise<Collection<T>>;
    /**
     *
     * @param collectionName - The name of the collection to create
     * @returns A new instance of the MarcSync collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.createCollection("my-collection");
     *
     * @remarks
    */
    createCollection<T extends EntryData = EntryData>(collectionName: string): Promise<Collection<T>>;
    /**
     *
     * @param event - The event to listen to
     * @param listener - The listener to call when the event is emitted
     * @returns The client instance
     *
    */
    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
}
export declare class Unauthorized extends Error {
    constructor(message?: string);
}
export interface ClientEvents {
    entryCreated: [entry: Entry<EntryData>, databaseId: string, timestamp: number];
    entryUpdated: [oldEntry: BaseEntry<EntryData>, newEntry: Entry<EntryData>, databaseId: string, timestamp: number];
    entryDeleted: [entry: BaseEntry<EntryData>, databaseId: string, timestamp: number];
}
