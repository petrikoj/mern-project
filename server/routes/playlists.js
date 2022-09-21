import express from "express";

const router = express.Router();

router.get("/test", (request, response) => {
  response.send({ msg: "Test route" });
});

export default router;
