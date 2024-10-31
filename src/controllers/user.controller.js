import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER, BAD_REQUEST, OK, NOT_FOUND } from "../../const.js";

const prisma = new PrismaClient();

const getInforUser = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;

    let nguoiDung = await prisma.nguoi_dung.findMany({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });

    if (!nguoiDung) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(OK).json(nguoiDung);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let file = req.file;

    const { nguoi_dung_id } = req.params;

    const { ho_ten, tuoi } = req.body;

    if (!ho_ten || !tuoi) {
      return res.status(BAD_REQUEST).json({
        message: "All fields are required: ho_ten, tuoi",
      });
    }

    let nguoiDung = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });

    if (!nguoiDung) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    let nguoiDungUpdated = await prisma.nguoi_dung.update({
      data: {
        ho_ten,
        tuoi: Number(tuoi),
        anh_dai_dien: file.path,
      },
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });

    return res.status(OK).json(nguoiDungUpdated);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ messgae: error.message });
  }
};

export { getInforUser, updateUser };
