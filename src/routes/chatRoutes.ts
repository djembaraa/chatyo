import express from "express";
import * as chatController from "../controllers/chatController";
import verifyToken from "../middleware/verifyToken";

const chatRouter = express.Router();

chatRouter.get("/chat/rooms", verifyToken, chatController.getRooms);

chatRouter.post("/chat/rooms", verifyToken, chatController.createRoomPersonal);

export default chatRouter;
