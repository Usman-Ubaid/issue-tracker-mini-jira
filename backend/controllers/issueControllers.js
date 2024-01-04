import { createIssue } from "./helpers/createIssue.js";
import Issue from "../models/Issue.js";

let issues = [];

/********************** GET ISSUE *********************/

const getIssues = async (req, res) => {
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

export { getIssues, addIssue, deleteIssue, updateIssue, addChild };
