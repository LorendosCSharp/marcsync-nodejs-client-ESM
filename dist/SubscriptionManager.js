import { BaseEntry, Entry } from "./Entry.js";
import * as signalR from "@microsoft/signalr";
export class SubscriptionManager {
    constructor(accessToken) {
        this._accessToken = accessToken;
        this._subscriptions = {
            entryCreated: [],
            entryDeleted: [],
            entryUpdated: []
        };
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://ws.marcsync.dev/websocket?access_token=Bearer " + accessToken, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
            .withAutomaticReconnect([0, 2000, 10000, 30000, 60000])
            .configureLogging(signalR.LogLevel.None)
            .build();
        this._hubConnection.start()
            .catch(err => {
            console.error(err.toString());
            process.exit(1);
        });
        this.handleSubscriptions();
    }
    subscribe(subscription, callback) {
        if (!this._subscriptions[subscription])
            this._subscriptions[subscription] = [];
        this._subscriptions[subscription].push(callback);
    }
    async handleSubscriptions() {
        this._hubConnection.on("entryCreated", (e) => {
            let d = JSON.parse(e);
            this._subscriptions.entryCreated.forEach(callback => { try {
                callback(new Entry(this._accessToken, d.data.collectionName, d.data.values), d.databaseId, d.timestamp);
            }
            catch (e) {
                console.error(e);
            } });
        });
        this._hubConnection.on("entryDeleted", (e) => {
            let d = JSON.parse(e);
            this._subscriptions.entryDeleted.forEach(callback => { try {
                callback(new BaseEntry(d.data.values, d.data.collectionName), d.databaseId, d.timestamp);
            }
            catch (e) {
                console.error(e);
            } });
        });
        this._hubConnection.on("entryUpdated", (e) => {
            let d = JSON.parse(e);
            this._subscriptions.entryUpdated.forEach(callback => { try {
                callback(new BaseEntry(d.data.oldValues, d.data.collectionName), new Entry(this._accessToken, d.data.collectionName, d.data.newValues), d.databaseId, d.timestamp);
            }
            catch (e) {
                console.error(e);
            } });
        });
    }
}
