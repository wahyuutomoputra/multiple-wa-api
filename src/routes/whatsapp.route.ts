import { Router } from "express";
const router = Router();
import { WhatsappController } from "../controllers";
import { body } from 'express-validator';

const controller = new WhatsappController();

router.get("/", controller.tes);
router.post("/createServer", controller.createServer);
router.get("/getAllClient", controller.getServerList);
router.post("/send",
    body('numberPhone').isString(),
    body('message').isString(),
    body('apiKey').isString(),
    controller.sendMessage);

export default router;