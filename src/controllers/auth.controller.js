import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER, BAD_REQUEST, OK } from "../../const.js";
import { createToken } from "../config/jwt.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    const nguoiDungExist = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (nguoiDungExist) {
      return res.status(BAD_REQUEST).json({
        message: `Tài khoản đã tồn tại`,
        data: null,
      });
    }

    const nguoiDungNew = await prisma.nguoi_dung.create({
      data: {
        email,
        mat_khau: bcrypt.hashSync(mat_khau, 10),
      },
    });

    return res.status(OK).json({
      message: "Đăng ký thành công",
      data: nguoiDungNew,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    let nguoiDungExist = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (!nguoiDungExist) {
      return res.status(BAD_REQUEST).json({ message: "Email is wrong" });
    }

    let checkPass = bcrypt.compareSync(mat_khau, nguoiDungExist.mat_khau);

    if (!checkPass) {
      return res.status(BAD_REQUEST).json({ message: "Password is wrong" });
    }

    let accessToken = createToken({
      nguoi_dung_id: nguoiDungExist.nguoi_dung_id,
    });

    return res.status(OK).json({
      message: "Login successfully",
      data: accessToken,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { register, login };
