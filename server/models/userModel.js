import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    lowercase: true,
    unique: true,
    // match: /.+\@.+\..+/,
    // validate: (value) => {
    //   return validator.isEmail(value);
    // },
  },
  user_avatar: {
    type: String,
  },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
});

const User = mongoose.model("user", userSchema);
export default User;
