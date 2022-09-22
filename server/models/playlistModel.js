import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
    unique: true,
  },
  songs: {
    type: Array,
    required: true,
    unique: true,
    single: {
      artist: { type: String, required: true },
      song_title: { type: String, required: true },
      album: { type: String, required: false },
      release_year: { type: String, required: false },
      cover_url: { type: String, required: false },
    },
  },
  date: { type: Date, default: Date.now },
  likes: { type: Number },
});

const Playlist = mongoose.model("playlist", playlistSchema);

export default Playlist;
