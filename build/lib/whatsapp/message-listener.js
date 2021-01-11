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
exports.MessageListener = void 0;
const models_1 = __importDefault(require("../../models"));
class MessageListener {
    constructor(data) {
        this.client = data.client;
        this.id = data.id;
    }
    main() {
        this.client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            const { from, to, timestamp, isForwarded, body, location, type } = msg;
            console.log(msg);
            const detailLoc = location != undefined ? JSON.stringify(location) : "";
            const time = timestamp.toString();
            yield models_1.default.Messages.create({
                from,
                isForwarded,
                timestamp: time,
                to,
                type,
                body,
                location: detailLoc
            });
            return;
        }));
    }
}
exports.MessageListener = MessageListener;
