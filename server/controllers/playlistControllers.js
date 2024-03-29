import mongoose from "mongoose";
import Playlist from "../models/playlistModel.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";

// GET all playlists

const getAllPlaylists = async (request, response) => {
  const allPlaylists = await Playlist.find({})
    .populate({ path: "creator", select: ["username", "avatar"] })
    .sort({ createdAt: -1 })
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
  try {
    const playlist = await Playlist.findOne({ _id: wantedPlaylistId })
      .populate({
        path: "creator",
        select: ["username", "avatar"],
      })
      .exec();
    if (playlist) {
      response.status(200).json(playlist);
    }
  } catch (error) {
    response.status(400).json({
      message: "Invalid URL",
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
  try {
    const newPlaylist = await Playlist.create({
      title: request.body.title,
      creator: request.body.creator,
      description: request.body.description,
      mood: request.body.mood,
      img_url: request.body.img_url,
      songs: request.body.songs,
      date: request.body.date,
      likes: request.body.likes,
    });
    if (!newPlaylist) {
      return response.status(501).json({ error: "Couldn't submit playlist" });
    }
    const myUser = await User.findOneAndUpdate(
      { _id: request.body.creator },
      { $push: { playlists: newPlaylist._id } },
      { new: true }
    );
    if (!myUser) {
      return response.status(501).json({ error: "User not found" });
    }
    const savedPlaylist = await Playlist.findOne({ _id: newPlaylist._id })
      .populate({
        path: "creator",
        select: ["username", "avatar"],
      })
      .exec();
    if (!savedPlaylist) {
      return response.status(501).json({ error: "Playlist not found" });
    }
    return response.status(200).json({
      message: "Playlist successfully created",
      newPlaylist: savedPlaylist,
    });
  } catch (error) {
    response.status(409).json({ message: "Failed to upload", error: error });
  }
};

// POST playlist img

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

// POST new comment

const postNewComment = async (request, response) => {
  const doesUserExist = await User.findOne({ _id: request.body.userId });
  if (doesUserExist) {
    try {
      const myPlaylist = await Playlist.findOneAndUpdate(
        { _id: request.body.playlistId },
        {
          $push: {
            comments: {
              ...request.body,
              author: request.body.userId,
              username: request.body.username,
              userphoto: request.body.userphoto,
              text: request.body.text,
            },
          },
        },
        { new: true }
      )
        .populate({
          path: "creator",
          select: ["username", "avatar"],
        })
        .exec();
      return response
        .status(200)
        .json({ message: "Comment posted", playlistUpdated: myPlaylist });
    } catch (error) {
      response
        .status(409)
        .json({ message: "Comment couldn't be posted", error: error.message });
    }
  } else {
    response.status(400).json({ message: "User not found" });
  }
};

// PUT/delete a comment

const removeComment = async (request, response) => {
  try {
    const myPlaylist = await Playlist.findOneAndUpdate(
      { _id: request.body.playlistId },
      {
        $pull: {
          comments: { _id: request.body.commentId },
        },
      },
      { new: true }
    )
      .populate({
        path: "creator",
        select: ["username", "avatar"],
      })
      .exec();
    return response
      .status(200)
      .json({ message: "Comment removed", updatedPlaylist: myPlaylist });
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .json({ message: "Could't remove comment", error: error });
    return error;
  }
};

// DELETE playlist

const deletePlaylist = async (request, response) => {
  try {
    const myPlaylist = await Playlist.findOneAndDelete(
      {
        _id: request.body._id,
      },
      { new: true }
    ).exec();
    if (!myPlaylist) {
      return response.status(404).json({ message: "Playlist ID not found" });
    }
    const myUser = await User.findOneAndUpdate(
      { _id: request.body.creator },
      {
        $pull: { playlists: myPlaylist._id },
      },
      { new: true }
    )
      .populate({
        path: "liked",
        select: ["title", "img_url", "songs", "liked_by"],
      })
      .populate({
        path: "playlists",
        select: ["title", "img_url", "songs", "liked_by"],
      })
      .exec();
    if (!myUser) {
      return response.status(206).json({
        message: "Error updating user profile after deleting playlist",
      });
    }
    myPlaylist.liked_by.forEach(async (event) => {
      await User.updateOne(
        { _id: event },
        {
          $pull: { liked: myPlaylist._id },
        }
      );
    });
    return response
      .status(200)
      .json({ message: "Playlist deleted", userUpdated: myUser });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// PATCH update playlist

/* const updatePlaylist = async (request, response) => {
  const playlistId = request.params._id;
  try {
    const myPlaylist = await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { ...request.body },
      { new: true }
    );
    if (!myPlaylist) {
      return response.status(404).json({ message: "Couldn't find ID" });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}; */

export {
  getAllPlaylists,
  getPlaylistById,
  uploadPlaylistPicture,
  postNewPlaylist,
  deletePlaylist,
  postNewComment,
  removeComment,
  //updatePlaylist,
};
