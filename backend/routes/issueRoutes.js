import express from "express";
import { addIssue } from "../controllers/issueControllers.js";

const router = express.Router();

router.post("/issues", addIssue);

export default router;
