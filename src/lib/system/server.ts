import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors())

export { app, server };
