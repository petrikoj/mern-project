import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/playlistsRoute.js";
import * as dotenv from "dotenv";
import playlistsRoute from "./routes/playlistsRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
};

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("api/all", playlistsRoute);
};

(async function controller() {
  await connectToDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
