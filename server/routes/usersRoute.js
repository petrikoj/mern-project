import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllUsers,
  getUserProfile,
  login,
  signUp,
  uploadUserPicture,
} from "../controllers/userController.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/profile", jwtAuth, getUserProfile);

router.post("/image-upload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
