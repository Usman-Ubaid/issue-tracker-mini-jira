import express from "express";

import {
  addIssue,
  getAllIssues,
  deleteIssue,
  updateIssue,
  addChild,
  updateIssueType,
  updateIssueTitle,
  updateIssueState,
} from "../controllers/issue.js";

const router = express.Router();

router.get("/issues", getAllIssues);
router.post("/issues", addIssue);
router.put("/issues/:id", updateIssue);
router.put("/issues/issueType/:id", updateIssueType);
router.put("/issues/issueTitle/:id", updateIssueTitle);
router.put("/issues/issueStatus/:id", updateIssueState);
router.put("/issues/:id/childIssue", addChild);
router.delete("/issues/:id", deleteIssue);

export default router;
