import express from "express";

import { addIssue, getIssues, deleteIssue } from "../controllers/issueControllers.js";

const router = express.Router();

router.get("/issues", getIssues);
router.post("/issues", addIssue);
router.delete("/issues/:id", deleteIssue);

export default router;
