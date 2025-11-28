import express from "express";
import multer from "multer";
import { storageGroupPaidPhoto, storageGroupPhoto } from "../utils/multer";
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

const uploadPaidPhoto = multer({
  storage: storageGroupPaidPhoto,
  // fileFilter(req, file, callback) {
  //   if (file.fieldname === "assets") {
  //     callback(null, true);
  //     return;
  //   }
  //   if (file.mimetype.startsWith("image/")) {
  //     callback(null, false);
  //   }

  //   callback(null, true);
  // },
});

groupRouter.get("/own-groups", verifyToken, groupController.getOwnGroup);

groupRouter.get("/groups", verifyToken, groupController.getDiscoverGroups);

groupRouter.get("/groups/:id", verifyToken, groupController.findDetailGroup);

groupRouter.get("/peoples", verifyToken, groupController.getDiscoverPeople);

groupRouter.post(
  "/groups/free",
  verifyToken,
  uploadPhoto.single("photo"),
  groupController.createFreeGroup
);

groupRouter.put(
  "/groups/free/:groupId",
  verifyToken,
  uploadPhoto.single("photo"),
  groupController.updateFreeGroup
);

groupRouter.post(
  "/groups/paid",
  verifyToken,
  uploadPaidPhoto.fields([{ name: "photo", maxCount: 1 }, { name: "assets" }]),
  groupController.createPaidGroup
);

groupRouter.put(
  "/groups/paid/:groupId",
  verifyToken,
  uploadPaidPhoto.fields([{ name: "photo", maxCount: 1 }, { name: "assets" }]),
  groupController.updatePaidGroup
);

groupRouter.post(
  "/groups/join",
  verifyToken,
  groupController.createMemberFreeGroup
);

groupRouter.delete(
  "/groups/assets/:id",
  verifyToken,
  groupController.deleteAssetGroup
);

export default groupRouter;
