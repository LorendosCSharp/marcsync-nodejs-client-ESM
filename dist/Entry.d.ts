type WithDefaultId<T extends EntryData> = T['_id'] extends string ? T : T & {
    _id: string;
};
export declare class BaseEntry<T extends EntryData> {
    private data;
    private collectionName;
    private _data;
    private _collectionName;
    constructor(data: T, collectionName: string);
    /**
     *
     * @returns The EntryData object of the entry
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entry = await collection.getEntryById("my-entry-id");
     *
     * const data = entry.getValues();
     *
     * console.log(data);
     *
     * @remarks
     * This method is useful if you want to get the values of the entry.
     *
     * @see {@link EntryData} for more information about entry data.
     *
    */
    getValues(): WithDefaultId<T>;
    /**
     *
     * @param key - The key of the value to get
     * @returns The value of the specified key
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entry = await collection.getEntryById("my-entry-id");
     *
     * const name = entry.getValue("name");
     *
     * console.log(name);
     *
     * @remarks
     * This method is useful if you want to get the value of a specific key without specifying the type.
     *
     * @see {@link EntryData} for more information about entry data.
     *
    */
    getValue<K extends keyof WithDefaultId<T>>(key: K): WithDefaultId<T>[K];
    /**
     *
     * @returns The name of the collection of the entry
     *
    */
    getCollectionName(): string;
    protected _setData(data: T): void;
}
export declare class Entry<T extends EntryData> extends BaseEntry<T> {
    private _accessToken;
    private _entryId;
    constructor(accessToken: string, collectionName: string, data: T);
    /**
     *
     * @param key - The key of the value to update
     * @param value - The value to update
     * @returns The values of the entry after update
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entry = await collection.getEntryById("my-entry-id");
     *
     * const name = entry.updateValue("name", "MarcSync");
     *
     * console.log(name);
     *
     * @remarks
     * This method is useful if you want to update the value of a specific key.
     *
    */
    updateValue<K extends keyof WithDefaultId<T>>(key: K, value: WithDefaultId<T>[K]): Promise<WithDefaultId<T>>;
    /**
     *
     * @param values - The values to update
     * @returns The values of the entry after update
     *
     * @example
     *
     * import { Client } from "marcsync";
     *
     * const client = new Client("<my access token>");
     * const collection = client.getCollection("my-collection");
     *
     * const entry = await collection.getEntryById("my-entry-id");
     *
     * await entry.updateValues({
     *    name: "MarcSync",
     *    age: 18
     * });
     *
     * @remarks
     * This method is useful if you want to update multiple values of the entry.
     *
     * @see {@link EntryData} for more information about entry data.
     * @see {@link updateValue} for more information about updating a single value.
     *
     */
    updateValues(values: Partial<{
        [K in keyof WithDefaultId<T>]: WithDefaultId<T>[K];
    }>): Promise<WithDefaultId<T>>;
    /**
     *
     * **__warning: Will delete the entry from the collection. This action cannot be undone.__**
     *
    */
    delete(): Promise<void>;
}
export interface EntryData {
    _id?: string;
    [key: string]: any;
}
export declare class EntryNotFound extends Error {
    constructor(message?: string);
}
export declare class EntryUpdateFailed extends Error {
    constructor(message?: any);
}
export {};
