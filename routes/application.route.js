import express from "express"
import isAuthenticated from "../middlewares/authentication.js";
import { applicationStatus, getApplications, getAppliedApplication, registerApplication } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/register/:id",isAuthenticated, registerApplication);
router.get("/get/", isAuthenticated, getAppliedApplication);
router.get("/:id/applicants", isAuthenticated, getApplications);
router.post("/status/:id/update", isAuthenticated, applicationStatus);

export default router;