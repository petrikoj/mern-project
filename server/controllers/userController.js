import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { body, validationResult } from "express-validator";
import encryptPassword from "../utils/encryptPassword.js";

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

// POST userPicture + signup new User

const uploadUserPicture = async (request, response) => {
  console.log("request.body:", request.body);

  try {
    console.log("request.file:", request.file);
    const uploadResult = await cloudinary.uploader.upload(request.file.path, {
      folder: "mern-project",
    });
    console.log("uploadResult", uploadResult);
    response.status(200).json({
      message: "Upload successful",
      user_img: uploadResult.url,
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

const signUp = async (request, response) => {
  console.log("Request.body:", request.body);
  try {
    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      response.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await encryptPassword(request.body.password);

      body("password").isLength({ min: 8 });
      body("user_email").isEmail();
      const error = validationResult(request);
      if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() });
      }

      const newUser = new User({
        username: request.body.userName,
        user_email: request.body.email,
        password: hashedPassword,
        user_avatar: request.body.user_img,
      });

      try {
        const savedUser = await newUser.save();
        response.status(201).json({
          user: {
            username: savedUser.username,
            email: savedUser.user_email,
            user_avatar: savedUser.user_avatar,
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

export { getAllUsers, uploadUserPicture, signUp };
