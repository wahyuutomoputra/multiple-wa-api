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
exports.WhatsappService = void 0;
const models_1 = __importDefault(require("../models"));
const whatsapp_1 = require("../lib/whatsapp");
class WhatsappService {
    createServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const insert = yield models_1.default.Devices.create({
                apiKey: data.apiKey,
                description: data.description,
                name: data.name,
                status: "ONLINE",
            });
            return insert;
        });
    }
    insertMessage(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, timestamp, isForwarded, body, location, type, fromMe } = chat;
            console.log(chat);
            const detailLoc = location != undefined ? JSON.stringify(location) : "";
            const insert = yield models_1.default.Messages.create({
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
        });
    }
    authenticated(key, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session != undefined) {
                const update = yield models_1.default.Devices.update({
                    WABrowserId: JSON.stringify(session.WABrowserId),
                    WASecretBundle: JSON.stringify(session.WASecretBundle),
                    WAToken1: JSON.stringify(session.WAToken1),
                    WAToken2: JSON.stringify(session.WAToken2),
                    status: "ONLINE",
                }, {
                    where: {
                        apiKey: key,
                    },
                });
                return update;
            }
            return null;
        });
    }
    disconnected(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield models_1.default.Devices.update({ status: "OFFLINE" }, {
                where: {
                    apiKey: key,
                },
            });
            return update;
        });
    }
    connected(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield models_1.default.Devices.update({ status: "ONLINE" }, {
                where: {
                    apiKey: key,
                },
            });
            return update;
        });
    }
    reloadDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            const wa = new whatsapp_1.whatsapp();
            const devices = yield models_1.default.Devices.findAll();
            devices.map((x) => __awaiter(this, void 0, void 0, function* () {
                let session = {
                    WABrowserId: x.WABrowserId,
                    WASecretBundle: x.WASecretBundle,
                    WAToken1: x.WAToken1,
                    WAToken2: x.WAToken2,
                };
                yield wa.init({
                    name: x.name,
                    description: x.description,
                    session,
                    apiKey: x.apiKey,
                });
            }));
            return;
        });
    }
}
exports.WhatsappService = WhatsappService;
