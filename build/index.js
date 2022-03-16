"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./lib/system/server");
const autoload_1 = __importDefault(require("./lib/system/autoload"));
const autoload = new autoload_1.default();
//const service = new WhatsappService();
autoload.main();
// setTimeout(() => {
//     service.reloadDevice();
// }, 5000);
server_1.server.listen(8080, () => console.log('listening port 8080'));
