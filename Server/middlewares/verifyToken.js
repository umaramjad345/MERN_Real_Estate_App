import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(new ErrorHandler("You're not Authorized", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(new ErrorHandler("Invalid Token", 403));
    req.user = user;
  });
  next();
};
