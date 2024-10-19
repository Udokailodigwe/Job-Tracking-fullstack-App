import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
// error handler middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
//routes
import authRouter from "./routes/auth.js";
import jobRouter from "./routes/jobs.js";
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";
//security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window`
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
