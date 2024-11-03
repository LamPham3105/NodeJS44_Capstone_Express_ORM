import express from "express";
import { getInforUser, updateUser } from "../controllers/user.controller.js";
import { middlewareToken } from "../config/jwt.js";
import { uploadCloud } from "../config/cloudinary.js";

const userRouter = express.Router();

/**
 * @swagger
 * /user/get-infor-user/{nguoi_dung_id}:
 *   get:
 *     summary: Get infor user
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authorization (e.g., "Bearer your_token_here")
 *       - in: path
 *         name: nguoi_dung_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User information
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/get-infor-user/:nguoi_dung_id", middlewareToken, getInforUser);

/**
 * @swagger
 * /user/update-user/{nguoi_dung_id}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authorization
 *       - in: path
 *         name: nguoi_dung_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ho_ten:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "Nguyen Van A"
 *               tuoi:
 *                 type: integer
 *                 description: Age of the user
 *                 example: 30
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request (missing fields)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put(
  "/update-user/:nguoi_dung_id",
  uploadCloud.single("hinhAnh"),
  updateUser
);

export default userRouter;
