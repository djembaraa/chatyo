import express from "express";
import multer from "multer";
import { storageGroupPhoto } from "../utils/multer";
import verifyToken from "../middleware/verifyToken";
import * as groupController from "../controllers/groupController";

const groupRouter = express.Router();

const uploadPhoto = multer({
  storage: storageGroupPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, false);
    }

    callback(null, true);
  },
});

groupRouter.post(
  "/groups/free",
  verifyToken,
  uploadPhoto.single("photo"),
  groupController.createFreeGroup
);

export default groupRouter;
