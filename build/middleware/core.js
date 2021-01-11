"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../lib/system/server");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class Core {
    main() {
        server_1.app.use(body_parser_1.default.json());
        server_1.app.use(cors_1.default());
        return server_1.app;
    }
}
exports.default = Core;
