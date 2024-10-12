import express from "express"
import { createJob, getAdminJobs, getAllJobs, getJobById } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/authentication.js";

const router = express.Router();

router.post("/create",isAuthenticated, createJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/adminJobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

export default router;