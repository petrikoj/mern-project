import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  likePlaylist,
  login,
  removeLikePlaylist,
  signUp,
  updateUser,
  uploadUserPicture,
} from "../controllers/userController.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/profile", jwtAuth, getUserProfile);
router.get("/profile/:_id", jwtAuth, getUserById);
router.post("/image-upload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", login);
//router.put("/likehandling", likeOrUnlikePlaylist);
router.put("/like", likePlaylist);
router.put("/unlike", removeLikePlaylist);

router.patch("/profile/:id/update-profile", jwtAuth, updateUser);

export default router;
