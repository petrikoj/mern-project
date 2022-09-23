import express from "express";
import { getAllPlaylists } from "../controllers/playlistControllers.js";

const router = express.Router();

router.get("/all", getAllPlaylists);

export default router;
