import { Client, ClientSession } from "whatsapp-web.js";
import { v4 as uuid } from "uuid";
import { Listener } from "./listener";

interface IWaSession {
    name: string;
    description: string;
    client: Client;
    id: string;
    connected: boolean;
}

interface IListSession {
    name: string;
    description: string;
    id: string;
    connected: boolean;
}

interface Iinit {
    name: string;
    description: string;
    apiKey?: string;
    session?: ClientSession;
}

interface IWaSessions extends Array<IWaSession> { }
interface IListSessions extends Array<IListSession> { }

class whatsapp {
    public session: IWaSessions = [];

    public async init(data: Iinit) {
        let connected = true;
        let id = data.apiKey ? data.apiKey : uuid();

        const client = new Client({
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ],
                headless: true
            }, session: data.session
        });

        const listener = new Listener({
            id,
            client,
            name: data.name,
            description: data.description,
            session: data.session
        });

        listener.main();

        const cek = this.session.push({
            name: data.name,
            description: data.description,
            connected,
            id,
            client
        });

        client.initialize();
        console.log(cek)

        return { client, id };
    }

    public getServerList() {
        let listSession: IListSessions = [];

        if (this.session.length != 0) {
            listSession = this.session.map(x => ({
                name: x.name,
                connected: x.connected,
                description: x.description,
                id: x.id
            }));
        }

        return listSession;
    }

    public findServer(key: string): IWaSession | undefined {
        const wa: IWaSession | undefined = this.session.find(x => x.id == key);
        return wa;
    }
}

export {
    IWaSession,
    IListSessions,
    whatsapp,
    Iinit
};