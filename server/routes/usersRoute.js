import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllUsers,
  signUp,
  uploadUserPicture,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/image-upload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);

export default router;
