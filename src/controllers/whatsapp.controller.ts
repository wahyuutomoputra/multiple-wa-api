import { Request, Response } from "express";
import { whatsapp, IListSessions } from "../lib/whatsapp";
import { CreateServer, sendMessage } from "../dto/whatsapp.dto";
import { WhatsappService as Service } from "../services/whatsapp.service";
import { phoneNumberFormatter } from "../helpers/formatNumber";
import { validationResult } from "express-validator";
import Model from "../models";
import { WAState } from "whatsapp-web.js";

const wa = new whatsapp();
const service = new Service();

class WhatsappController {
  public async tes(req: Request, res: Response) {
    try {
      const devices = await Model.Devices.findAll();
      devices.forEach(async (x) => {
        await wa.init({
          name: x.name,
          description: x.description,
          apiKey: x.apiKey,
        });
      });
    } catch (error) {}
    res.json({
      data: "success",
    });
  }

  public async createServer(req: Request<{}, {}, CreateServer>, res: Response) {
    const { name, description } = req.body;
    const { client, id } = await wa.init({ name, description });

    res.json({
      data: "created",
    });
  }

  public getServerList(req: Request, res: Response) {
    const list: IListSessions = wa.getServerList();

    res.json({
      data: list,
    });
  }

  public async sendMessage(req: Request<{}, {}, sendMessage>, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { numberPhone, apiKey, message } = req.body;

    let number = phoneNumberFormatter(numberPhone);

    const server = wa.findServer(apiKey);

    if (server === undefined) {
      return res.status(422).json({
        message: "Server not found",
      });
    }

    const status = await server.client.getState();
    if (status != WAState.CONNECTED) {
      return res.status(422).json({
        message: `Phone not connected, status is ${status}`,
      });
    }

    const isRegisteredNumber = await server?.client.isRegisteredUser(number);

    if (!isRegisteredNumber) {
      return res.status(422).json({
        message: "The number is not registered",
      });
    }

    const send = await server.client.sendMessage(number, message);
    const insert = await service.insertMessage(send);

    res.json({
      message: "message has send",
    });
  }
}

export default WhatsappController;
