"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const routes_1 = __importDefault(require("../../routes"));
const socket_1 = __importDefault(require("./socket"));
class Autoload {
    main() {
        socket_1.default;
        models_1.default.DATABASE.sync();
        routes_1.default;
        return;
    }
}
exports.default = Autoload;
