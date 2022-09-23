import Playlist from "../models/playlistModel.js";

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

// GET playlist by

export { getAllPlaylists };
