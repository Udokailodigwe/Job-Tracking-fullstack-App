import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
  showStats,
} from "../controllers/jobs.js";
import testUser from "../middleware/testUser.js";
const router = express.Router();

router.get("/stats", showStats);
router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", testUser, createJob);
router.patch("/:id", testUser, updateJob);
router.delete("/:id", testUser, deleteJob);

//router.route('/').post(createJob).get(getAllJobs)
//router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router;
