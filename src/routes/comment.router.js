import express from "express";
import {
  getCommentByIDImage,
  createCommentForImage,
} from "../controllers/comment.controller.js";
import { middlewareToken } from "../config/jwt.js";

const commentRouter = express.Router();

/**
 * @swagger
 * /comment/get-comment-by-image/{hinh_id}:
 *   get:
 *     summary: Get comments for a specific image
 *     tags: [Comment]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authorization
 *       - in: path
 *         name: hinh_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the image
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Internal server error
 */
commentRouter.get(
  "/get-comment-by-image/:hinh_id",
  middlewareToken,
  getCommentByIDImage
);

/**
 * @swagger
 * /comment/create-comment-for-image:
 *   post:
 *     summary: Create comment for a image
 *     tags: [Comment]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nguoi_dung_id:
 *                 type: string
 *                 example: "string"
 *               hinh_id:
 *                 type: string
 *                 example: "string"
 *               noi_dung:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: All fields are required nguoi_dung_id, hinh_id, noi_dung
 *       500:
 *         description: Internal server error
 */
commentRouter.post(
  "/create-comment-for-image",
  middlewareToken,
  createCommentForImage
);

export default commentRouter;
