"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use(cors_1.default());
app.use((err, req, res, next) => {
    // body-parser will set this to 400 if the json is in error
    if (err.status === 400)
        return res.status(err.status).json({
            message: 'Invalid format json',
        });
    return next(err); // if it's not a 400, let the default error handling do it. 
});
