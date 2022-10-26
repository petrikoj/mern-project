import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  likeOrUnlikePlaylist,
  likePlaylist,
  login,
  removeLikePlaylist,
  signUp,
  uploadUserPicture,
} from "../controllers/userController.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/profile", jwtAuth, getUserProfile);
router.get("/profile/:_id", getUserById);

router.post("/image-upload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", login);

router.put("/likehandling", likeOrUnlikePlaylist);
router.put("/like", likePlaylist);
router.put("/unlike", removeLikePlaylist);

export default router;
