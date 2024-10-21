import { Router } from "express";
import {
  addMessage,
  getAllMessages,
  getUserChat,
} from "../controllers/chat.controller.js";

const router = Router();
router.route("/addMessage").post(addMessage);
router.route("/getAllMessages").get(getAllMessages);
router.route("/getUserChat").get(getUserChat);

export default router;
