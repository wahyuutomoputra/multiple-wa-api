"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const socket_io_1 = require("socket.io");
const socket = new socket_io_1.Server(server_1.server, {
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
exports.default = socket;
