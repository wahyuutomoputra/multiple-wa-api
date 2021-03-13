import { server } from "./server";
import { Server } from "socket.io";

const socket = new Server(server, {
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
    },
  transports: ['websocket', 'polling'],
})


export default socket;
