import { createIssue } from "./helpers/createIssue.js";
import Issue from "../models/Issue.js";
import { isValidObjectId } from "mongoose";

const validIssueTypes = ["Epic", "Story", "Task"];
const validIssueStates = ["ToDo", "InProgress", "Done"];

/********************** GET ALL ISSUE *********************/

const getAllIssues = async (req, res) => {
  try {
    const allIssues = await Issue.find();
    return res
      .status(200)
      .json({ message: "Data fetched successfully ", data: allIssues });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

/********************** ADD ISSUE *********************/

const addIssue = async (req, res) => {
  const { title, issueType } = req.body;

  try {
    if (!title || !issueType) {
      return res.status(400).json({ message: "Fill all the fields" });
    }
    const newIssue = { title, issueType };
    const issue = await new Issue(newIssue).save();
    return res.status(201).json({
      message: "success",
      data: { id: issue._id },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/********************** UPDATE ISSUE *********************/

const updateIssue = async (req, res) => {
  const id = req.params.id;
  const { title, issueType, state } = req.body;

  const issue = await Issue.findById(id);

  try {
    if (issue) {
      issue.title = title || issue.title;
      issue.issueType = issueType || issue.issueType;
      issue.state = state || issue.state;

      await issue.save();

      return res.status(200).json({ message: "Issue Updated" });
    } else {
      return res.status(400).json({ message: "Issue not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/********************** UPDATE ISSUE TYPE *********************/

const updateIssueType = async (req, res) => {
  const id = req.params.id;
  const { issueType } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!validIssueTypes.includes(issueType)) {
    return res.status(400).json({ message: "Invalid issueType" });
  }

  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(400).json({ message: "Issue not Found" });
    }

    issue.issueType = issueType;
    await issue.save();
    return res.status(200).json({ message: "Issue Type Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

/********************** UPDATE ISSUE TITLE *********************/

const updateIssueTitle = async (req, res) => {
  const id = req.params.id;
  const { issueTitle } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!issueTitle) {
    return res.status(400).json({ message: "Title is required" });
  }

  const issue = await Issue.findById(id);

  try {
    if (!issue) {
      return res.status(400).json({ message: "Issue not Found" });
    }

    issue.title = issueTitle;
    await issue.save();
    return res.status(200).json({ message: "Issue Title Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

/********************** UPDATE ISSUE STATE *********************/

const updateIssueState = async (req, res) => {
  const id = req.params.id;
  const { issueState } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!issueState) {
    return res.status(400).json({ message: "Issue State is required" });
  }

  if (!validIssueStates.includes(issueState)) {
    return res.status(400).json({ message: "Invalid issue state" });
  }

  const issue = await Issue.findById(id);

  try {
    if (!issue) {
      return res.status(400).json({ message: "Issue not Found" });
    }

    issue.state = issueState;
    await issue.save();
    return res.status(200).json({ message: "Issue State Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

/********************** DELETE ISSUE *********************/

const deleteIssue = async (req, res) => {
  const id = req.params.id;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(400).json({ message: "No issue found" });
    }

    await issue.deleteOne();

    res.json({ message: "Issue removed" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/********************** ADD CHILD ISSUE *********************/

const addChild = async (req, res) => {
  const parentId = req.params.id;
  const { childId } = req.body;

  try {
    const childIssue = await Issue.findById(childId);
    const parentIssue = await Issue.findById(parentId);

    if (!parentIssue || !childIssue) {
      return res.status(400).json({ error: "ID not found" });
    }

    if (parentIssue.issueType === "Task") {
      return res
        .status(400)
        .json({ error: "Issue type of 'Task' cannot have children" });
    }

    if (parentIssue.issueType === childIssue?.issueType) {
      return res
        .status(400)
        .json({ error: "Same issue type cannot be each other's children" });
    }

    if (parentIssue.issueType === "Story" && childIssue?.issueType === "Epic") {
      return res.status(400).json({ error: "Epic cannot be a child of Story" });
    }

    if (childIssue) {
      if (parentIssue.children.includes(childId)) {
        return res.status(400).json({ error: "Child already added" });
      }
      parentIssue.children.push(childIssue._id);
    }

    await parentIssue.save();

    return res.status(201).json({ message: "success", data: parentIssue });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllIssues,
  addIssue,
  deleteIssue,
  updateIssue,
  updateIssueType,
  updateIssueTitle,
  updateIssueState,
  addChild,
};
