import express from "express";
import { addIssue, deleteIssue } from "../controllers/issueControllers.js";

const router = express.Router();

router.post("/issues", addIssue);
router.delete("/issues/:id", deleteIssue);

export default router;
