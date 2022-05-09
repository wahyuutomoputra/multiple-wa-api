import {
  Client,
  ClientSession,
  ClientOptions,
  LocalAuth,
} from "whatsapp-web.js";
import { v4 as uuid } from "uuid";
import { Listener } from "./listener";
import Model from "../../models";

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
  //   session?: ClientSession;
}

interface IWaSessions extends Array<IWaSession> {}
interface IListSessions extends Array<IListSession> {}

class whatsapp {
  public session: IWaSessions = [];

  public async init(data: Iinit) {
    let connected = true;
    let id = data.apiKey ?? uuid();
    console.log(id);

    const clientData: ClientOptions = {
      puppeteer: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=mode",
        ],
        headless: true,
        timeout: 3000,
      },
      authStrategy: new LocalAuth({ clientId: id }),
    };

    const client = new Client(clientData);

    const listener = new Listener({
      id,
      client,
      name: data.name,
      description: data.description,
      session: data?.apiKey ? true : false,
    });

    listener.main();

    this.session.push({
      name: data.name,
      description: data.description,
      connected,
      id,
      client,
    });

    client.initialize();
    console.log({
      name: data.name,
      description: data.description,
      connected,
      id,
      client,
    });

    return { client, id };
  }

  public getServerList() {
    let listSession: IListSessions = [];

    if (this.session.length != 0) {
      listSession = this.session.map((x) => ({
        name: x.name,
        connected: x.connected,
        description: x.description,
        id: x.id,
      }));
    }

    return listSession;
  }

  public findServer(key: string): IWaSession | undefined {
    const wa: IWaSession | undefined = this.session.find((x) => x.id == key);
    return wa;
  }

}

export { IWaSession, IListSessions, whatsapp, Iinit };
