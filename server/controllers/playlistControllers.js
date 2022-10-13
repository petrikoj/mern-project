import Playlist from "../models/playlistModel.js";
import { v2 as cloudinary } from "cloudinary";

// GET all playlists

const getAllPlaylists = async (request, response) => {
  const allPlaylists = await Playlist.find({})
    .populate({
      path: "author",
      select: ["_id", "username"],
    })
    .exec();
  console.log("Logging all playlists:", allPlaylists);
  try {
    if (allPlaylists.length === 0) {
      response.status(200).json({ msg: "Nothing found in DB" });
    } else {
      response.status(200).json(allPlaylists);
    }
  } catch (error) {
    response.status(500).json({
      msg: "Server failed",
      error: error,
    });
  }
};

// POST new playlist

const postNewPlaylist = async (request, response) => {
  const newPlaylist = new Playlist({
    title: request.body.title,
    author: request.body.author,
    description: request.body.description,
    mood: request.body.mood,
    image_url: request.body.image_url,
    songs: request.body.songs,
    date: request.body.date,
    likes: request.body.likes,
  });
  try {
    const savePlaylist = await newPlaylist.save();
    response.status(200).json({ message: "Playlist succesfully created" });
  } catch (error) {
    response.status(409).json({ message: "Failed to upload", error: error });
  }
};

// Upload playlist img

const uploadPlaylistPicture = async (request, response) => {
  console.log("Playlist picture request.body:", request.body);
  console.log("Playlist picture request.file:", request.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(request.file.path, {
      folder: "mern-project/playlists",
    });
    console.log("uploadResult", uploadResult);
    response.status(200).json({
      message: "Upload successful",
      img_url: uploadResult.url,
    });
  } catch (error) {
    response.status(500).json({
      message: "Image upload failed",
      error: error,
    });
  }
};

export { getAllPlaylists, postNewPlaylist, uploadPlaylistPicture };
