import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, getJobsCreateByAdmin, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getJobsCreatedByAdmin").get(isAuthenticated, getJobsCreateByAdmin);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
