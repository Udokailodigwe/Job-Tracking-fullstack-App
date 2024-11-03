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
import path from "path";
import { fileURLToPath } from "url";

//security packages
import helmet from "helmet";
import xss from "xss-clean";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
