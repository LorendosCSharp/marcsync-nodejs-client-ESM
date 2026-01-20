import { EntryData } from "./Entry.js";
import { ClientEvents } from "./marcsync.js";
export declare class SubscriptionManager {
    private _subscriptions;
    private _hubConnection;
    private _accessToken;
    constructor(accessToken: string);
    subscribe(subscription: keyof ClientEvents, callback: () => void): void;
    private handleSubscriptions;
}
export interface BaseEvent {
    databaseId: string;
    timestamp: number;
    type: number;
}
export interface EntryCreatedEvent extends BaseEvent {
    data: {
        collectionName: string;
        values: EntryData;
    };
}
export interface EntryDeletedEvent extends BaseEvent {
    data: {
        collectionName: string;
        values: EntryData;
    };
}
export interface EntryUpdatedEvent extends BaseEvent {
    data: {
        collectionName: string;
        oldValues: EntryData;
        newValues: EntryData;
    };
}
