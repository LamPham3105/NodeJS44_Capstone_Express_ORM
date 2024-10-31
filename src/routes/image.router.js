import express from "express";
import {
  getListImagePage,
  getListImageByNamePage,
  getDetailImageAndUserByIDImage,
  getSaveImageByImageID,
  getListImageCreatedByUserIDPage,
  getListImageSavedByUserIDPage,
  deleteImageByID,
  createImage,
} from "../controllers/image.controller.js";
import { middlewareToken } from "../config/jwt.js";
import { uploadCloud } from "../config/cloudinary.js";

const imageRouter = express.Router();

imageRouter.get("/get-images/:page/:size", getListImagePage);
imageRouter.get(
  "/get-images-by-name/:ten_hinh/:page/:size",
  getListImageByNamePage
);
imageRouter.get("/get-detail-image/:hinh_id", getDetailImageAndUserByIDImage);
imageRouter.get(
  "/get-save-image/:hinh_id",
  middlewareToken,
  getSaveImageByImageID
);
imageRouter.get(
  "/get-image-created-by-user/:page/:size",
  middlewareToken,
  getListImageCreatedByUserIDPage
);
imageRouter.get(
  "/get-image-saved-by-user/:page/:size",
  middlewareToken,
  getListImageSavedByUserIDPage
);
imageRouter.delete("/delete-image/:hinh_id", middlewareToken, deleteImageByID);
imageRouter.post(
  "/upload-image",
  middlewareToken,
  uploadCloud.single("hinhAnh"),
  createImage
);

export default imageRouter;
