import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
