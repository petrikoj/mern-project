import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllPlaylists,
  postNewPlaylist,
  uploadPlaylistPicture,
} from "../controllers/playlistControllers.js";

const router = express.Router();

router.get("/all", getAllPlaylists);
router.post("/create", postNewPlaylist);
router.post(
  "/image-upload",
  multerUploads.single("image"),
  uploadPlaylistPicture
);

export default router;
