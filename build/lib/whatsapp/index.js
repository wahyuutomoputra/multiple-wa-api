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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsapp = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const uuid_1 = require("uuid");
const listener_1 = require("./listener");
const models_1 = __importDefault(require("../../models"));
class whatsapp {
    constructor() {
        this.session = [];
    }
    init(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let connected = true;
            let id = (_a = data.apiKey) !== null && _a !== void 0 ? _a : uuid_1.v4();
            console.log(id);
            const clientData = {
                puppeteer: {
                    args: [
                        "--no-sandbox",
                        "--disable-setuid-sandbox",
                        "--unhandled-rejections=mode",
                    ],
                    headless: true,
                    timeout: 3000,
                },
                authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: id }),
            };
            const client = new whatsapp_web_js_1.Client(clientData);
            const listener = new listener_1.Listener({
                id,
                client,
                name: data.name,
                description: data.description,
                session: (data === null || data === void 0 ? void 0 : data.apiKey) ? true : false,
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
        });
    }
    getServerList() {
        let listSession = [];
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
    findServer(key) {
        const wa = this.session.find((x) => x.id == key);
        return wa;
    }
    reloadSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield models_1.default.Devices.findAll();
                devices.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                    yield this.init({
                        name: x.name,
                        description: x.description,
                        apiKey: x.apiKey,
                    });
                }));
            }
            catch (error) { }
        });
    }
}
exports.whatsapp = whatsapp;
