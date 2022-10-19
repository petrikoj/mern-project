import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

// GET all users

const getAllUsers = async (request, response) => {
  const allUsers = await User.find({})
    .populate({
      path: "playlists",
      select: ["_id", "title", "img_url"],
    })
    .exec();
  console.log("Logging all users:", allUsers);
  try {
    if (allUsers.length === 0) {
      response.status(200).json({ msg: "Nothing found" });
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

// POST userPicture

const uploadUserPicture = async (request, response) => {
  console.log("request.body:", request.body);
  console.log("request.file:", request.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(request.file.path, {
      folder: "mern-project/users",
    });
    console.log("uploadResult", uploadResult);
    response.status(200).json({
      message: "Upload successful",
      avatar: uploadResult.url,
    });
  } catch (error) {
    response.status(500).json({
      message: "Image upload failed",
      error: error,
    });
  }
};

// const encryptPassword = async (password) => {
//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashPassword = await bcrypt.hash(password, salt);

//     return hashPassword;
//   } catch (error) {
//     console.log("Error hashing password", error);
//   }
// };

// POST newUser

const signUp = async (request, response) => {
  console.log("Request.body @ const signUp:", request.body);

  try {
    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      response.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await encryptPassword(request.body.password);

      const newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
        avatar: request.body.avatar,
      });

      try {
        const savedUser = await newUser.save();
        response.status(201).json({
          user: {
            username: savedUser.username,
            email: savedUser.email,
            avatar: savedUser.avatar,
            _id: savedUser._id,
          },
          message: "User registration successful",
        });
      } catch (error) {
        response
          .status(409)
          .json({ message: "Couldn't save new user", error: error });
      }
    }
  } catch (error) {
    response
      .status(401)
      .json({ message: "Registration not possible", error: error });
  }
};

// Login

const login = async (request, response) => {
  console.log("Request.body from login:", request.body);
  try {
    const existingUser = await User.findOne({ email: request.body.email })
      .populate({
        path: "playlists",
        select: ["title", "img_url", "songs"],
      })
      .exec();
    if (!existingUser) {
      response.status(401).json({ message: "No such user found" });
    }
    if (existingUser) {
      // Create a function to compare request pw with pw stored in db: //
      const verified = await verifyPassword(
        request.body.password,
        existingUser.password
      );
      if (!verified) {
        response.status(401).json({ message: "Wrong password" });
      }
      if (verified) {
        console.log("User is logged in");
        const token = issueToken(existingUser._id);
        console.log("Token:", token);
        response.status(201).json({
          message: "Login successful",
          user: {
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            avatar: existingUser.avatar,
            playlists: existingUser.playlists,
            liked: existingUser.liked,
          },
          token,
        });
      }
    }
  } catch (error) {}
};

// GET user profile

const getUserProfile = async (request, response) => {
  console.log("Request.user from getUserProfile():", request.user);
  response.status(201).json({
    _id: request.user._id,
    email: request.user.email,
    username: request.user.username,
    avatar: request.user.avatar,
    playlists: request.user.playlists,
    liked: request.user.liked,
  });
};

const getMyUser = async (request, response) => {
  const userId = request.params._id;
  const myUser = await User.findOne({ _id: userId })
    .populate({
      path: "playlists",
      select: ["title", "img_url", "songs"],
    })
    .exec();
  console.log("myUser in getMyUser:", myUser);
  try {
    if (myUser === null || myUser === undefined) {
      response.status(200).json({ msg: "Nothing found" });
    } else {
      response.status(200).json(myUser);
    }
  } catch (error) {
    response.status(500).json({
      msg: "Server failed",
      error: error,
    });
  }
};

export {
  getAllUsers,
  getUserProfile,
  uploadUserPicture,
  signUp,
  login,
  getMyUser,
};
