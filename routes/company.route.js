import express from "express"
import isAuthenticated from "../middlewares/authentication.js";
import { getCompany, getCompanyById, registerCompany, updateCompanyInfo } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById)
router.put("/update/:id", isAuthenticated, updateCompanyInfo);

export default router;