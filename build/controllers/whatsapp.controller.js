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
const whatsapp_1 = require("../lib/whatsapp");
const whatsapp_service_1 = require("../services/whatsapp.service");
const formatNumber_1 = require("../helpers/formatNumber");
const express_validator_1 = require("express-validator");
const wa = new whatsapp_1.whatsapp();
const service = new whatsapp_service_1.WhatsappService();
class WhatsappController {
    tes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service.reloadDevice();
            res.json({
                data: 'success'
            });
        });
    }
    createServer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            const { client, id } = yield wa.init({ name, description });
            res.json({
                data: 'created'
            });
        });
    }
    getServerList(req, res) {
        const list = wa.getServerList();
        res.json({
            data: list
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { numberPhone, apiKey, message } = req.body;
            let status = "Not found";
            let number = formatNumber_1.phoneNumberFormatter(numberPhone);
            const server = wa.findServer(apiKey);
            if (server === undefined) {
                return res.status(422).json({
                    message: 'Server not found'
                });
            }
            const isRegisteredNumber = yield (server === null || server === void 0 ? void 0 : server.client.isRegisteredUser(number));
            if (!isRegisteredNumber) {
                return res.status(422).json({
                    message: 'The number is not registered'
                });
            }
            const send = yield server.client.sendMessage(number, message);
            const insert = yield service.insertMessage(send);
            res.json({
                message: 'message has send'
            });
        });
    }
}
exports.default = WhatsappController;
