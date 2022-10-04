import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    // unique: true,
    // match: /.+\@.+\..+/,
    // validate: (value) => {
    //   return validator.isEmail(value);
    // },
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
  },

  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
});

const User = mongoose.model("user", userSchema);
export default User;
