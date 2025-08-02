import express from "express";
import { createMessage, getAllMessages } from "../controllers/messageController.js";
import { isAdminAuthenticted } from "../middleware/auth.js";

const messageRouter=express.Router();

messageRouter.post("/create",createMessage)
messageRouter.get("/getAllMessages",isAdminAuthenticted,getAllMessages)

export default messageRouter