import express from "express";

import {
  addIssue,
  getIssues,
  deleteIssue,
  updateIssue,
  addChild,
} from "../controllers/issueControllers.js";

const router = express.Router();

router.get("/issues", getIssues);
router.post("/issues", addIssue);
router.put("/issues/:id", updateIssue);
router.put("/issues/:id/childIssue", addChild);
router.delete("/issues/:id", deleteIssue);

export default router;
