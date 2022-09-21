import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/playlists.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

app.use("/api", router);
