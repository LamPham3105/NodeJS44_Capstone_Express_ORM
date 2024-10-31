import express from "express";
import { getInforUser, updateUser } from "../controllers/user.controller.js";
import { middlewareToken } from "../config/jwt.js";
import { uploadCloud } from "../config/cloudinary.js";

const userRouter = express.Router();

userRouter.get("/get-infor-user/:nguoi_dung_id", middlewareToken, getInforUser);
userRouter.put(
  "/update-user/:nguoi_dung_id",
  uploadCloud.single("hinhAnh"),
  updateUser
);

export default userRouter;
