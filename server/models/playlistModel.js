import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  mood: {
    type: String,
    required: true,
  },
  songs: {
    type: Array,
    required: true,
    unique: true,
    single: {
      type: Object,
      artist: { type: String, required: true },
      song_title: { type: String, required: true },
      album: { type: String, required: false },
      // release_year: { type: String, required: false },
      cover_url: { type: String, required: false },
    },
  },
  date: { type: Date, default: Date.now },
  likes: { type: Number },
});

const Playlist = mongoose.model("playlist", playlistSchema);

export default Playlist;
