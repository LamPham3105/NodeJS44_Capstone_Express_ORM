import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const validFormats = ["jpeg", "png", "gif", "webp"];
      const fileFormat = file.mimetype.split("/")[1];

      if (validFormats.includes(fileFormat)) {
        return fileFormat;
      }

      return "png";
    },
    transformation: [
      {
        width: 800,
        quality: "auto:good",
        fetch_format: "auto",
      },
    ],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

export const uploadCloud = multer({ storage });
