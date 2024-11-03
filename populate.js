import dotenv from "dotenv";
import mockData from "./mockData.json" assert { type: "json" };
import Job from "./models/Job.js";
import connectDB from "./db/connect.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
