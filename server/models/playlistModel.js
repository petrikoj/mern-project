import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: { type: String, required: true },

    username: { type: String },
    userphoto: { type: String },
  },
  { timestamps: true }
);

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  /*  author: {
    required: true,
    type: mongoose.Schema.Types.String,
    ref: "user",
  }, */
  description: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
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
  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  /* comments: {
    type: Array,
    comment: {
      type: Object,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  }, */
  comments: [commentSchema],
});

const Playlist = mongoose.model("playlist", playlistSchema);

export default Playlist;
