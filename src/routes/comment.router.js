import express from "express";
import {
  getCommentByIDImage,
  createCommentForImage,
} from "../controllers/comment.controller.js";
import { middlewareToken } from "../config/jwt.js";

const commentRouter = express.Router();

commentRouter.get(
  "/get-comment-by-image/:hinh_id",
  middlewareToken,
  getCommentByIDImage
);

commentRouter.post(
  "/create-comment-for-image",
  middlewareToken,
  createCommentForImage
);

export default commentRouter;
