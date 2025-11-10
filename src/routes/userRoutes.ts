import express from "express";
import multer from "multer";
import { storageUserPhoto } from "../utils/multer";
import * as userController from "../controllers/userControllers";

const userRouter = express.Router();

const uploadPhoto = multer({
  storage: storageUserPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, false);
    }

    callback(null, true);
  },
});

userRouter.post(
  "/auth/sign-up",
  uploadPhoto.single("profilePicture"),
  userController.signUp
);

userRouter.post("/auth/sign-in", userController.signIn);

userRouter.post("/auth/reset-password", userController.getEmailReset);

userRouter.put("/auth/reset-password/:tokenId", userController.updatePassword);

export default userRouter;
