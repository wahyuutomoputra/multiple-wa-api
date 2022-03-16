import { Message, ClientSession } from "whatsapp-web.js";
import Model from "../models";
import { whatsapp } from "../lib/whatsapp";

interface IAuthenticated {
  name: string;
  description: string;
  apiKey: string;
  session?: ClientSession;
}

class WhatsappService {
  public async createServer(data: IAuthenticated) {
    const insert = await Model.Devices.create({
      apiKey: data.apiKey,
      description: data.description,
      name: data.name,
      status: "ONLINE",
    });
    return insert;
  }

  public async insertMessage(chat: Message) {
    const { from, to, timestamp, isForwarded, body, location, type, fromMe } =
      chat;
    console.log(chat);

    const detailLoc = location != undefined ? JSON.stringify(location) : "";
    const insert = await Model.Messages.create({
      from,
      isForwarded,
      timestamp: timestamp.toString(),
      to,
      type,
      body,
      location: detailLoc,
      fromMe,
    });

    return insert;
  }

  public async authenticated(key: string, session: ClientSession | undefined) {
    if (session != undefined) {
      const update = await Model.Devices.update(
        {
          WABrowserId: JSON.stringify(session.WABrowserId),
          WASecretBundle: JSON.stringify(session.WASecretBundle),
          WAToken1: JSON.stringify(session.WAToken1),
          WAToken2: JSON.stringify(session.WAToken2),
          status: "ONLINE",
        },
        {
          where: {
            apiKey: key,
          },
        }
      );
      return update;
    }
    return null;
  }

  public async disconnected(key: string) {
    const update = await Model.Devices.update(
      { status: "OFFLINE" },
      {
        where: {
          apiKey: key,
        },
      }
    );
    return update;
  }

  public async connected(key: string) {
    const update = await Model.Devices.update(
      { status: "ONLINE" },
      {
        where: {
          apiKey: key,
        },
      }
    );
    return update;
  }

  public async reloadDevice() {
    const wa = new whatsapp();
    const devices = await Model.Devices.findAll();

    devices.map(async (x) => {
      let session: ClientSession = {
        WABrowserId: x.WABrowserId,
        WASecretBundle: x.WASecretBundle,
        WAToken1: x.WAToken1,
        WAToken2: x.WAToken2,
      };

      await wa.init({
        name: x.name,
        description: x.description,
        session,
        apiKey: x.apiKey,
      });
    });

    return;
  }
}

export { WhatsappService, IAuthenticated };
