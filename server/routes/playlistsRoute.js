import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllPlaylists,
  uploadNewPlaylist,
  uploadPlaylistPicture,
} from "../controllers/playlistControllers.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllPlaylists);
router.post("/create", uploadNewPlaylist);
router.post(
  "/image-upload",
  multerUploads.single("image"),
  uploadPlaylistPicture
);

export default router;
