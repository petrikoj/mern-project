import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllPlaylists,
  getPlaylistById,
  postNewPlaylist,
  uploadPlaylistPicture,
} from "../controllers/playlistControllers.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllPlaylists);
router.get("/:_id", getPlaylistById);
router.post(
  "/image-upload",
  multerUploads.single("image"),
  uploadPlaylistPicture
);
router.post("/create", postNewPlaylist);

export default router;
