import express from "express";
import { getAllPlaylists } from "../controllers.js";

const router = express.Router();

router.get("/all", getAllPlaylists);

export default router;
