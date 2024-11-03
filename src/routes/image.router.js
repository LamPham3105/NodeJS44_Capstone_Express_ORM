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

/**
 * @swagger
 * /image/get-images:
 *   get:
 *     summary: Get a paginated list of images
 *     tags: [Image]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         description: The page number to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: size
 *         in: query
 *         required: true
 *         description: The number of images per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A paginated list of images
 *       404:
 *         description: Images not found
 *       400:
 *         description: Bad request (invalid page or size)
 *       500:
 *         description: Internal server error
 */
imageRouter.get("/get-images", getListImagePage);

/**
 * @swagger
 * /image/get-images-by-name:
 *   get:
 *     summary: Get a paginated list of images by name
 *     tags: [Image]
 *     parameters:
 *       - name: ten_hinh
 *         in: query
 *         required: true
 *         description: The name of the image
 *         schema:
 *           type: string
 *           example: 'example-image.jpg'
 *       - name: page
 *         in: query
 *         required: true
 *         description: The page number to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: size
 *         in: query
 *         required: true
 *         description: The number of images per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A paginated list of images by name
 *       404:
 *         description: Images not found
 *       400:
 *         description: Bad request (invalid page or size)
 *       500:
 *         description: Internal server error
 */
imageRouter.get("/get-images-by-name", getListImageByNamePage);

/**
 * @swagger
 * /image/get-detail-image/{hinh_id}:
 *   get:
 *     summary: Get image detail
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: hinh_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the image
 *     responses:
 *       200:
 *         description: Detail image
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
imageRouter.get("/get-detail-image/:hinh_id", getDetailImageAndUserByIDImage);

/**
 * @swagger
 * /image/get-save-image/{hinh_id}:
 *   get:
 *     summary: Get image saved by user
 *     tags: [Image]
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
 *         description: Image is saved with detail
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
imageRouter.get(
  "/get-save-image/:hinh_id",
  middlewareToken,
  getSaveImageByImageID
);

/**
 * @swagger
 * /image/get-image-created-by-user:
 *   get:
 *     summary: Get a paginated list of images created by user
 *     tags: [Image]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token for authorization
 *         schema:
 *           type: string
 *       - name: nguoi_dung_id
 *         in: query
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: page
 *         in: query
 *         required: true
 *         description: The page number to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: size
 *         in: query
 *         required: true
 *         description: The number of images per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A paginated list of images created by the user
 *       404:
 *         description: Images not found
 *       400:
 *         description: Bad request (invalid page, size, or nguoi_dung_id)
 *       500:
 *         description: Internal server error
 */
imageRouter.get(
  "/get-image-created-by-user",
  middlewareToken,
  getListImageCreatedByUserIDPage
);

/**
 * @swagger
 * /image/get-image-saved-by-user:
 *   get:
 *     summary: Get a paginated list of images saved by user
 *     tags: [Image]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token for authorization
 *         schema:
 *           type: string
 *       - name: nguoi_dung_id
 *         in: query
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: page
 *         in: query
 *         required: true
 *         description: The page number to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: size
 *         in: query
 *         required: true
 *         description: The number of images per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A paginated list of images saved by the user
 *       404:
 *         description: Images not found
 *       400:
 *         description: Bad request (invalid page, size, or nguoi_dung_id)
 *       500:
 *         description: Internal server error
 */
imageRouter.get(
  "/get-image-saved-by-user",
  middlewareToken,
  getListImageSavedByUserIDPage
);

/**
 * @swagger
 * /image/delete-image/{hinh_id}:
 *   delete:
 *     summary: Delete a image by ID
 *     tags: [Image]
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
 *         description: ID of the image to retrieve comments for
 *     responses:
 *       200:
 *         description: Delete successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
imageRouter.delete("/delete-image/:hinh_id", middlewareToken, deleteImageByID);

/**
 * @swagger
 * /image/create-image:
 *   post:
 *     summary: Create a image
 *     tags: [Image]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authorization (e.g., "your_token_here")
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ten_hinh:
 *                 type: string
 *                 description: Name of image
 *                 example: "Beach"
 *               mo_ta:
 *                 type: string
 *                 description: Description of a image
 *                 example: "Image description"
 *               nguoi_dung_id:
 *                 type: integer
 *                 format: binary
 *                 description: ID of user
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Create a image successfully
 *       400:
 *         description: Bad request (missing fields)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
imageRouter.post(
  "/create-image",
  middlewareToken,
  uploadCloud.single("hinhAnh"),
  createImage
);

export default imageRouter;
