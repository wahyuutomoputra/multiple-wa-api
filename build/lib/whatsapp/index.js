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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let connected = true;
            let id = data.apiKey ? data.apiKey : uuid_1.v4();
            let waSession = undefined;
            const clientData = {
                puppeteer: {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--unhandled-rejections=mode'
                    ],
                    headless: true,
                    timeout: 3000,
                },
            };
            if (data.session) {
                waSession = {
                    WABrowserId: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.WABrowserId) !== null && _b !== void 0 ? _b : '',
                    WASecretBundle: (_d = (_c = data.session) === null || _c === void 0 ? void 0 : _c.WASecretBundle) !== null && _d !== void 0 ? _d : '',
                    WAToken1: (_f = (_e = data.session) === null || _e === void 0 ? void 0 : _e.WAToken1) !== null && _f !== void 0 ? _f : '',
                    WAToken2: (_h = (_g = data.session) === null || _g === void 0 ? void 0 : _g.WAToken2) !== null && _h !== void 0 ? _h : ''
                };
                clientData.session = waSession;
            }
            const client = new whatsapp_web_js_1.Client(clientData);
            const listener = new listener_1.Listener({
                id,
                client,
                name: data.name,
                description: data.description,
                session: waSession
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
