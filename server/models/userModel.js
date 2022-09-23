import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_firstname: {
    type: String,
    required: true,
  },
  user_lastname: {
    type: String,
    required: true,
  },
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
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
});

const User = mongoose.model("user", userSchema);
export default User;
