import { Router } from "express";
import {
  addMessage,
  getAllMessages,
  getUserChat,
} from "../controllers/chat.controller.js";

const router = Router();
router.route("/addMessage").post(addMessage);
router.route("/getAllMessages").post(getAllMessages);
router.route("/getUserChat").post(getUserChat);

export default router;
