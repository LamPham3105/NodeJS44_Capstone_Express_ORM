import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UNAUTHORAIZED } from "../../const.js";

dotenv.config();

export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "120s",
  });
};

export const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export const getPayloadToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return decoded;
  } catch (error) {
    return error;
  }
};

export const middlewareToken = (req, res, next) => {
  let { token } = req.headers;
  let checkToken = verifyToken(token);
  if (checkToken) {
    next();
  } else {
    return res.status(UNAUTHORAIZED).json({ message: "Unauthorized" });
  }
};
