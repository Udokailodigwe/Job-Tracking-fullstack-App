import express from "express";
import { login, register, updateUser } from "../controllers/auth.js";
import authenticateUser from "../middleware/authentication.js";
import testUser from "../middleware/testUser.js";
const router = express.Router();
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);
export default router;
