import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./image.router.js";
import commentRouter from "./comment.router.js";
import userRouter from "./user.router.js";

const rootRoutes = express.Router();

rootRoutes.use("/auth", authRouter);
rootRoutes.use("/image", imageRouter);
rootRoutes.use("/comment", commentRouter);
rootRoutes.use("/user", userRouter);

export default rootRoutes;
