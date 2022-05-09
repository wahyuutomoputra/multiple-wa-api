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
          WABrowserId: session.WABrowserId,
          WASecretBundle: session.WASecretBundle,
          WAToken1: session.WAToken1,
          WAToken2: session.WAToken2,
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

  // public async reloadDevice() {
  //   try {
  //     const wa = new whatsapp();
  //     const devices = await Model.Devices.findAll();

  //     devices.forEach(async (x) => {
  //       await wa.init({
  //         name: x.name,
  //         description: x.description,
  //         apiKey: x.apiKey,
  //       });
  //     });

  //     wa.tesAdd()

  //     // devices.map(async (x) => {

  //     // });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return;
  // }
}

export { WhatsappService, IAuthenticated };
