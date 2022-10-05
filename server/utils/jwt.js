import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const issueToken = (userId) => {
  const options = {
    expiresIn: "3d",
  };
  const payload = {
    sub: userId,
  };
  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY, options);

  return jwt;
};

export { issueToken };
