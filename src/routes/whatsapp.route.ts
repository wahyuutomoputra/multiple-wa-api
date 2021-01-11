import { Router } from "express";
const router = Router();
import { WhatsappController } from "../controllers";

const controller = new WhatsappController();

router.get("/", controller.tes);
router.post("/createServer", controller.createServer);
router.get("/getAllClient", controller.getServerList);
router.post("/send", controller.sendMessage);

export default router;