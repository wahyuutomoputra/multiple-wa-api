import { Request, Response } from "express";
import { whatsapp, IListSessions } from "../lib/whatsapp";
import { CreateServer, sendMessage } from "../dto/whatsapp.dto";
import { WhatsappService as Service } from "../services/whatsapp.service";

const wa = new whatsapp();
const service = new Service();

class WhatsappController {

    public async tes(req: Request, res: Response) {
        await service.reloadDevice();
        res.json({
            data: 'success'
        })
    }

    public async createServer(req: Request<{}, {}, CreateServer>, res: Response) {
        const { name, description } = req.body;
        const { client, id } = await wa.init({name, description});

        res.json({
            data: 'created'
        })
    }

    public getServerList(req: Request, res: Response) {
        const list: IListSessions = wa.getServerList();

        res.json({
            data: list
        })
    }

    public async sendMessage(req: Request<{}, {}, sendMessage>, res: Response) {
        const { numberPhone, apiKey, message } = req.body;
        let status: string = "Not found";

        const server = wa.findServer(apiKey);
        if (server !== undefined) {
            const send = await server.client.sendMessage(`${numberPhone}@c.us`, message);
            const insert = await service.insertMessage(send)
            status = "Success";
        }

        res.json({
            data: status
        })
    }

}

export default WhatsappController;