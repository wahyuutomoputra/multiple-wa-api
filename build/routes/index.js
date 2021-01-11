"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../lib/system/server");
const whatsapp_route_1 = __importDefault(require("./whatsapp.route"));
server_1.app.use("/api", whatsapp_route_1.default);
exports.default = server_1.app;
