import { createIssue } from "./helpers/createIssue.js";
import Issue from "../models/Issue.js";

let issues = [];

//* GET ISSUES */

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

const updateIssue = async (req, res) => {
  const id = req.params.id;
  const { title, type, state } = req.body;

  const issue = await Issue.findById(id);

  try {
    if (issue) {
      issue.title = title || issue.title;
      issue.type = type || issue.type;
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

const updateChildIssue = (req, res) => {
  const parentId = parseInt(req.params.id);
  const childId = parseInt(req.body.childId);
  const { title, type } = req.body;

  const childIssue = issues.find((issue) => issue.issueId === childId);
  const parentIssue = issues.find((issue) => issue.issueId === parentId);

  if (!parentIssue || (!childIssue && !(title && type))) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (parentIssue.type !== "Epic" && parentIssue.type !== "Story") {
    return res.status(400).json({ error: "Task cannot have children" });
  }

  if (parentIssue.type === childIssue?.type) {
    return res
      .status(400)
      .json({ error: "Same issue type cannot be each other's children" });
  }

  if (parentIssue.type === "Story" && childIssue?.type === "Epic") {
    return res.status(400).json({ error: "Epic cannot be a child of Story" });
  }

  if (!parentIssue.children) {
    parentIssue.children = [];
  }

  if (childIssue) {
    parentIssue.children.push(childId);
  } else if (title && type) {
    const newChildIssue = createIssue(title, type);
    parentIssue.children.push(newChildIssue.issueId);
    issues.push(newChildIssue);
  }

  return res.status(201).json({ message: "success", data: issues });
};

//* ADD ISSUE */

const addIssue = async (req, res) => {
  const { title, type } = req.body;

  try {
    if (!title || !type) {
      return res.status(400).json({ message: "Fill all the fields" });
    }
    const newIssue = { title, type };
    const issue = await new Issue(newIssue).save();
    return res.status(201).json({
      message: "success",
      data: { id: issue._id },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteIssue = (req, res) => {
  const id = parseInt(req.params.id);

  const filterIssues = issues.filter((issue) => {
    return issue.issueId !== id;
  });

  if (filterIssues.length === issues.length) {
    return res.json({ error: "ID does not exist" });
  }

  issues = filterIssues;

  res.json({ message: "success", data: issues });
};

export { getIssues, addIssue, deleteIssue, updateIssue, updateChildIssue };
