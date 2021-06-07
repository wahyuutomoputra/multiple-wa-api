import { Client, ClientSession } from "whatsapp-web.js";
import Io from "../system/socket";
import { Server } from "socket.io";
import qrcode from "qrcode";
import { WhatsappService as Service, IAuthenticated } from "../../services/whatsapp.service";

interface IListener {
    client: Client;
    id: string;
    description: string;
    name: string;
    session?: ClientSession | undefined;
}

const service = new Service();

class Listener {
    client: Client;
    id: string;
    io: Server;
    description: string;
    name: string;
    session: ClientSession | undefined;

    constructor(data: IListener) {
        this.client = data.client;
        this.id = data.id;
        this.io = Io;
        this.description = data.description;
        this.name = data.name;
        this.session = data.session;
    }

    public main() {
        if(this.session == undefined){
            this.createServer();
        }
        this.auth()
        this.qrcode();
        this.messageListener();
        this.status();

        return;
    }

    private async createServer() {
        await service.createServer({
            apiKey: this.id,
            description: this.description,
            name: this.name,
        })
    }

    private auth() {
        let Authstatus = false;
        this.client.on("authenticated", async (session) => {
            await service.authenticated(this.id, session);
            Authstatus = true;
        })

        this.client.on("auth_failure", async () => {
            await service.disconnected(this.id);
            Authstatus = false;
        })

        return Authstatus;
    }

    private status() {
        this.client.on("disconnected", async () => await service.disconnected(this.id))
        this.client.on("ready", async () => await service.connected(this.id))
    }

    private messageListener() {
        this.client.on("message", async msg => {
            service.insertMessage(msg);
            return;
        })
    }

    private qrcode() {
        this.client.on('qr', (qr) => {
            console.log(`login from number ${this.id}`, qr)
            qrcode.toDataURL(qr, (err, url) => {
                this.io.emit(`qrcode-${this.id}`, {
                    image: url,
                    number: this.id
                });
            })
        });

    }

}

export { IListener, Listener };