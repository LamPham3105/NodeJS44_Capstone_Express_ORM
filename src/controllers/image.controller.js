import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER, BAD_REQUEST, OK, NOT_FOUND } from "../../const.js";

const prisma = new PrismaClient();

const getListImagePage = async (req, res) => {
  try {
    let { page, size } = req.params;

    page = parseInt(page, 10);
    size = parseInt(size, 10);

    if (isNaN(page) || page <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Page is wrong" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Size is wrong" });
    }

    let index = (page - 1) * size;

    let hinhAnh = await prisma.hinh_anh.findMany({
      skip: index,
      take: size,
    });

    if (hinhAnh.length == 0) {
      return res.status(NOT_FOUND).json({ message: "Images not found" });
    }

    return res.status(OK).json(hinhAnh);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const getListImageByNamePage = async (req, res) => {
  try {
    let { ten_hinh, page, size } = req.params;

    page = parseInt(page, 10);
    size = parseInt(size, 10);

    if (isNaN(page) || page <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Page is wrong" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Size is wrong" });
    }

    let index = (page - 1) * size;

    let hinhAnh = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: ten_hinh,
      },
      skip: index,
      take: size,
    });

    if (hinhAnh.length == 0) {
      return res.status(NOT_FOUND).json({ message: "Images not found" });
    }

    return res.status(OK).json(hinhAnh);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const getDetailImageAndUserByIDImage = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let hinhAnh = await prisma.hinh_anh.findUnique({
      where: {
        hinh_id: Number(hinh_id),
      },
      include: {
        nguoi_dung: {
          select: {
            ho_ten: true,
            email: true,
          },
        },
      },
    });

    if (!hinhAnh) {
      return res.status(NOT_FOUND).json({ message: "Image not found" });
    }

    return res.status(OK).json(hinhAnh);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const getSaveImageByImageID = async (req, res) => {
  try {
    const { hinh_id } = req.params;

    const luuAnh = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: Number(hinh_id),
      },
      include: {
        nguoi_dung: {
          select: {
            ho_ten: true,
            email: true,
          },
        },
        hinh_anh: {
          select: {
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
          },
        },
      },
    });

    if (!luuAnh) {
      return res.status(NOT_FOUND).json({ message: "Image not found" });
    }

    return res.status(OK).json(luuAnh);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const getListImageCreatedByUserIDPage = async (req, res) => {
  try {
    let { page, size } = req.params;

    const { nguoi_dung_id } = req.body;

    page = parseInt(page, 10);
    size = parseInt(size, 10);

    if (isNaN(page) || page <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Page is wrong" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Size is wrong" });
    }

    if (!nguoi_dung_id) {
      return res.status(BAD_REQUEST).json({
        message: "Field is required: nguoi_dung_id",
      });
    }

    let index = (page - 1) * size;

    let hinhAnh = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
      skip: index,
      take: size,
    });

    if (hinhAnh.length == 0) {
      return res.status(NOT_FOUND).json({ message: "Images not found" });
    }

    return res.status(OK).json(hinhAnh);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const getListImageSavedByUserIDPage = async (req, res) => {
  try {
    let { page, size } = req.params;

    const { nguoi_dung_id } = req.body;

    page = parseInt(page, 10);
    size = parseInt(size, 10);

    if (isNaN(page) || page <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Page is wrong" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(BAD_REQUEST).json({ message: "Size is wrong" });
    }

    if (!nguoi_dung_id) {
      return res.status(BAD_REQUEST).json({
        message: "Field is required: nguoi_dung_id",
      });
    }

    let index = (page - 1) * size;

    let luuAnh = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
      include: {
        hinh_anh: {
          select: {
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
          },
        },
      },
      skip: index,
      take: size,
    });

    if (luuAnh.length === 0) {
      return res.status(NOT_FOUND).json({ message: "Images not found" });
    }

    const mergeImages = luuAnh.map((item) => item.hinh_anh);

    return res.status(OK).json(mergeImages);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const deleteImageByID = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let hinhAnh = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(hinh_id),
      },
    });

    if (!hinhAnh) {
      return res.status(NOT_FOUND).json({ message: "Image not found" });
    }

    await prisma.hinh_anh.delete({
      where: {
        hinh_id: Number(hinh_id),
      },
    });

    return res.status(OK).json({ message: "Image deleted successfully!" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

const createImage = async (req, res) => {
  try {
    let file = req.file;

    const { ten_hinh, mo_ta, nguoi_dung_id } = req.body;

    if (!ten_hinh || !mo_ta || !nguoi_dung_id) {
      return res.status(BAD_REQUEST).json({
        message: "All fields are required: ten_hinh, mo_ta, nguoi_dung_id",
      });
    }

    let nguoiDung = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });

    if (!nguoiDung) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    let hinhAnhNew = await prisma.hinh_anh.create({
      data: {
        ten_hinh,
        duong_dan: file.path,
        mo_ta,
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });

    return res.status(OK).json(hinhAnhNew);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: error.message });
  }
};

export {
  getListImagePage,
  getListImageByNamePage,
  getDetailImageAndUserByIDImage,
  getSaveImageByImageID,
  getListImageCreatedByUserIDPage,
  getListImageSavedByUserIDPage,
  deleteImageByID,
  createImage,
};