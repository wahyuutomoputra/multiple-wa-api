"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../lib/system/database"));
const messages_model_1 = __importDefault(require("./messages.model"));
const devices_model_1 = __importDefault(require("./devices.model"));
const model = {
    DATABASE: database_1.default,
    Messages: messages_model_1.default,
    Devices: devices_model_1.default
};
exports.default = model;
