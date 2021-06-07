"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsapp = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const uuid_1 = require("uuid");
const listener_1 = require("./listener");
class whatsapp {
    constructor() {
        this.session = [];
    }
    init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let connected = true;
            let id = data.apiKey ? data.apiKey : uuid_1.v4();
            const client = new whatsapp_web_js_1.Client({
                puppeteer: {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--unhandled-rejections=mode'
                    ],
                    headless: true,
                    timeout: 3000
                }, session: data.session,
            });
            const listener = new listener_1.Listener({
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
            console.log(cek);
            return { client, id };
        });
    }
    getServerList() {
        let listSession = [];
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
    findServer(key) {
        const wa = this.session.find(x => x.id == key);
        return wa;
    }
}
exports.whatsapp = whatsapp;
