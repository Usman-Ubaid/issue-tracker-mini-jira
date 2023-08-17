import express from "express";
import { addIssue, getIssues } from "../controllers/issueControllers.js";

const router = express.Router();

router.get("/issues", getIssues);
router.post("/issues", addIssue);

export default router;
