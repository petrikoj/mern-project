import User from "../models/userModel.js";

// GET all users

const getAllUsers = async (request, response) => {
  const allUsers = await User.find({})
    .populate({
      path: "playlists",
      select: ["_id", "title"],
    })
    .exec();
  console.log("Logging all users:", allUsers);
  try {
    if (allUsers.length === 0) {
      response.status(200).json({ msg: "Nothing found in DB" });
    } else {
      response.status(200).json(allUsers);
    }
  } catch (error) {
    response.status(500).json({
      msg: "Server failed",
      error: error,
    });
  }
};

export { getAllUsers };
