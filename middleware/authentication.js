import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
// import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); //Decoded the payload passed in jwt.sign({...}) @User/model
    req.user = { userId: payload.userId, name: payload.name };

    // if (needMoreUserDataFromDB) {
    //   const user = await User.findById(payload.userId).select("-password");
    //   req.user = user;
    // }

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default authMiddleware;
