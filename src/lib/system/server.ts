import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // body-parser will set this to 400 if the json is in error
    if (err.status === 400)
        return res.status(err.status).json({
            message: 'Invalid format json',
        });

    return next(err); // if it's not a 400, let the default error handling do it. 
});

export { app, server };
