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
exports.Listener = void 0;
const socket_1 = __importDefault(require("../system/socket"));
const qrcode_1 = __importDefault(require("qrcode"));
const whatsapp_service_1 = require("../../services/whatsapp.service");
const service = new whatsapp_service_1.WhatsappService();
class Listener {
    constructor(data) {
        this.client = data.client;
        this.id = data.id;
        this.io = socket_1.default;
        this.description = data.description;
        this.name = data.name;
        this.session = data.session;
    }
    main() {
        if (this.session == undefined) {
            this.createServer();
        }
        this.auth();
        this.qrcode();
        this.messageListener();
        this.status();
        return;
    }
    createServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield service.createServer({
                apiKey: this.id,
                description: this.description,
                name: this.name,
            });
        });
    }
    auth() {
        let Authstatus = false;
        this.client.on("authenticated", (session) => __awaiter(this, void 0, void 0, function* () {
            yield service.authenticated(this.id, session);
            Authstatus = true;
        }));
        this.client.on("auth_failure", () => __awaiter(this, void 0, void 0, function* () {
            yield service.disconnected(this.id);
            Authstatus = false;
        }));
        return Authstatus;
    }
    status() {
        this.client.on("disconnected", () => __awaiter(this, void 0, void 0, function* () { return yield service.disconnected(this.id); }));
        this.client.on("ready", () => __awaiter(this, void 0, void 0, function* () { return yield service.connected(this.id); }));
    }
    messageListener() {
        this.client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            service.insertMessage(msg);
            return;
        }));
    }
    qrcode() {
        this.client.on('qr', (qr) => {
            console.log(`login from number ${this.id}`, qr);
            qrcode_1.default.toDataURL(qr, (err, url) => {
                this.io.emit(`qrcode-${this.id}`, {
                    image: url,
                    number: this.id
                });
            });
        });
    }
}
exports.Listener = Listener;
