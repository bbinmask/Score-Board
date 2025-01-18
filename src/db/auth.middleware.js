import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import multer from "multer";

export const verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );
    if (!user) {
      throw new Error(401, "Invalid Access Token");
    }
    req.user = user;
    // next();
  } catch (error) {
    throw new Error(401, error?.message || "Invalid access token");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalName);
  },
});

const upload = multer({ storage });
