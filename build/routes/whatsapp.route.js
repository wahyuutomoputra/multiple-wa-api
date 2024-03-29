"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const controller = new controllers_1.WhatsappController();
router.get("/", controller.tes);
router.post("/createServer", controller.createServer);
router.get("/getAllClient", controller.getServerList);
router.post("/send", express_validator_1.body('numberPhone').isString(), express_validator_1.body('message').isString(), express_validator_1.body('apiKey').isString(), controller.sendMessage);
exports.default = router;
