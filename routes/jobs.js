import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobs.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

//router.route('/').post(createJob).get(getAllJobs)
//router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router;
