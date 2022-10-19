import mongoose from "mongoose";
import Playlist from "../models/playlistModel.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";

// GET all playlists

const getAllPlaylists = async (request, response) => {
  const allPlaylists = await Playlist.find({})
    .populate({ path: "creator", select: ["username", "avatar"] })
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
      message: "Server failed",
      error: error,
    });
  }
};

// GET playlist by _id

const getPlaylistById = async (request, response) => {
  const wantedPlaylistId = request.params._id;
  const playlist = await Playlist.findOne({ _id: wantedPlaylistId }).exec();
  try {
    if (playlist === undefined || playlist === null) {
      response.status(200).json({ msg: "Object not found" });
      console.log("Object not found");
    } else {
      response.status(200).json(playlist);
      console.log("Server/getPlaylistbyId:", playlist);
    }
  } catch (error) {
    response.status(500).json({
      message: "Server failed",
      error: error,
    });
  }
};

// GET Playlists by user._id

/* const getPlaylistsByUserId = async (request, response) => {
  const userId = request.params._id;
  const playlistsFromUserId = await Playlist.find({
    creator: userId,
  }).exec();
  try {
    if (playlistsFromUserId === undefined || playlistsFromUserId === null) {
      response.status(200).json({ msg: "Object not found" });
      console.log("Object not found");
    } else {
      response.status(200).json(playlistsFromUserId);
      console.log("Server/getPlaylistsbyUserId:", playlistsFromUserId);
    }
  } catch (error) {
    response.status(500).json({
      message: "Server failed",
      error: error,
    });
  }
}; */

// POST new playlist

const postNewPlaylist = async (request, response) => {
  const newPlaylist = new Playlist({
    title: request.body.title,
    creator: request.body.creator,
    description: request.body.description,
    mood: request.body.mood,
    img_url: request.body.img_url,
    songs: request.body.songs,
    date: request.body.date,
    likes: request.body.likes,
  });
  try {
    const savedPlaylist = await newPlaylist.save();
    response.status(200).json({ message: "Playlist succesfully created" });
  } catch (error) {
    response.status(409).json({ message: "Failed to upload", error: error });
  }
  try {
    await User.findOneAndUpdate(
      { _id: request.body.creator },
      { $push: { playlists: newPlaylist._id } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

// Alternative upload function

/* const uploadNewPlaylist = async (request, response) => {
  console.log("request.body", request.body);
  try {
    const playlist = await Playlist.create(request.body);
    response.status(200).json(playlist);
  } catch (error) {
    response.status(500).json({ error: error.message });
    return;
  }
  try {
    await User.findOneAndUpdate(
      { _id: request.body.author_id },
      { $push: { playlists: playlist._id } }
    );
  } catch (error) {
    alert(error);
  }
}; */

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

export {
  getAllPlaylists,
  getPlaylistById,
  uploadPlaylistPicture,
  postNewPlaylist,
};
