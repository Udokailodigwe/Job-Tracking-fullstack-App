import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  if (!jobs) {
    throw new BadRequestError("Failed to load jobs, please try again later");
  }
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with job id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; //with reference to Job model schema (createdBy): mongoose.Types.ObjectId, ref: "User",
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position },
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with this job Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with this job Id ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ msg: `Job with Id ${jobId} deleted` });
};

export { getAllJobs, getJob, createJob, deleteJob, updateJob };
