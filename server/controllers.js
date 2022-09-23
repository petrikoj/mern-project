import Playlist from "./models/playlistModel.js";

const getAllPlaylists = async (request, response) => {
  const allPlaylists = await Playlist.find({});
  console.log("Logging all playlists:", allPlaylists);
  try {
    if (allPlaylists.length === 0) {
      response.status(200).json({ msg: "Nothing found in DB" });
    } else {
      response.status(200).json({
        allPlaylists,
        totalItems: allPlaylists.length,
      });
    }
  } catch (error) {
    response.status(500).json({
      msg: "Server failed",
      error: error,
    });
  }
};

export { getAllPlaylists };
