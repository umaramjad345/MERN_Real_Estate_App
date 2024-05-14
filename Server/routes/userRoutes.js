import express from "express";
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
  getAllUsers,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);
router.get("/getallusers/:id", verifyToken, getAllUsers);

export default router;
