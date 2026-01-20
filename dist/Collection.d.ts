import { Entry, EntryData } from "./Entry.js";
export declare class Collection<T extends EntryData> {
    private _accessToken;
    private _collectionName;
    /**
     *
     * @param accessToken - The access token to use for communication with MarcSync
     * @param collectionName - The name of the collection to use
     * @returns A new instance of the MarcSync collection
     *
     **/
    constructor(accessToken: string, collectionName: string);
    /**
     *
     * **__warning: This method will delete the collection and all of its entries. This action cannot be undone.__**
     *
     */
    drop(): Promise<void>;
    /**
     *
     * @returns The name of the collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * console.log(await collection.setName("my-new-collection-name"));
     *
     */
    setName(name: string): Promise<void>;
    /**
     *
     * @returns The name of the collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * console.log(await collection.getName());
     *
     */
    getName(): string;
    /**
     *
     * @returns Whether or not the collection exists
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * if (await collection.exists()) {
     *    console.log("Collection exists!");
     * } else {
     *   console.log("Collection does not exist!");
     * }
     *
     * @remarks
     * This method is useful if you want to fetch the collection from the server to check if it exists before using it.
     *
     */
    exists(): Promise<boolean>;
    /**
     *
     * @returns Creates an entry in the collection
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * await collection.createEntry({
     *   name: "MarcSync",
     *   description: "A simple, easy to use database for your projects"
     * });
     *
    */
    createEntry(data: T): Promise<Entry<T>>;
    /**
     *
     * @returns The entry with the specified ID
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entry = await collection.getEntryById("my-entry-id");
    */
    getEntryById(id: string): Promise<Entry<T>>;
    /**
     *
     * @returns The entries with the specified filter
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entries = await collection.getEntries({
     *  name: "MarcSync"
     * });
     *
     * console.log(entries);
     *
     * @remarks
     * This method is useful if you want to fetch multiple entries from the server at once.
     *
     * @see {@link getEntryById} if you want to fetch a single entry by its Id.
     * @see {@link Entry} for more information about entries.
     * @see {@link EntryData} for more information about entry data.
     *
     */
    getEntries(filter?: Partial<{
        [K in keyof T]: T[K];
    }>): Promise<Entry<T>[]>;
    /**
     *
     * @returns The Id of the deleted entry
     *
     * **__warning: Will delete the entry from the collection. This action cannot be undone.__**
     *
    */
    deleteEntryById(id: string): Promise<string>;
    /**
     *
     * @returns The amount of deleted entries
     *
     * **__warning: Will delete the entries from the collection. This action cannot be undone.__**
     *
    */
    deleteEntries(filter?: Partial<{
        [K in keyof T]: T[K];
    }>): Promise<number>;
    /**
     *
     * @returns The Id of the updated entry
     *
    */
    updateEntryById(id: string, data: Partial<{
        [K in keyof T]: T[K];
    }>): Promise<string>;
    /**
     *
     * @returns The amount of updated entries
     *
    */
    updateEntries(filter: Partial<{
        [K in keyof T]: T[K];
    }>, data: Partial<{
        [K in keyof T]: T[K];
    }>): Promise<number>;
}
export declare class CollectionNotFound extends Error {
    constructor(message?: string);
}
export declare class CollectionAlreadyExists extends Error {
    constructor(message?: string);
}
