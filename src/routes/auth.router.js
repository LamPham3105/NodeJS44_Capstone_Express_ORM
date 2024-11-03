import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register for a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user123@gmail.com"
 *               mat_khau:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       400:
 *         description: Account has existed
 *       200:
 *         description: Register successfully
 *       500:
 *         description:  Internal server error
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user123@gmail.com"
 *               mat_khau:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       400:
 *         description: Email is wrong or Password is wrong
 *       200:
 *         description: Login successfully
 *       500:
 *         description:  Internal server error
 */
authRouter.post("/login", login);

export default authRouter;
