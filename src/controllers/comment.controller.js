import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER, BAD_REQUEST, OK } from "../../const.js";

const prisma = new PrismaClient();

const getCommentByIDImage = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let binhLuan = await prisma.binh_luan.findMany({
      where: {
        hinh_id: Number(hinh_id),
      },
    });

    if (binhLuan.length == 0) {
      return res.status(NOT_FOUND).json({ message: "Comments not found" });
    }
    return res.status(OK).json(binhLuan);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const createCommentForImage = async (req, res) => {
  try {
    const { nguoi_dung_id, hinh_id, noi_dung } = req.body;

    if (!nguoi_dung_id || !hinh_id || !noi_dung) {
      return res.status(BAD_REQUEST).json({
        message: "All fields are required: nguoi_dung_id, hinh_id, noi_dung",
      });
    }

    let binhLuanNew = await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: Number(nguoi_dung_id),
        hinh_id: Number(hinh_id),
        ngay_binh_luan: new Date(),
        noi_dung,
      },
    });

    return res.status(OK).json(binhLuanNew);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

export { getCommentByIDImage, createCommentForImage };
