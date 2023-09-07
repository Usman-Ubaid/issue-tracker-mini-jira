import { createIssue } from "./helpers/createIssue.js";

let issues = [];

const getIssues = (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Data fetched successfully ", data: issues });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const updateIssue = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, type, state } = req.body;

  const issueToUpdate = issues.find((issue) => issue.issueId === id);

  try {
    issueToUpdate.title = title || issueToUpdate.title;
    issueToUpdate.type = type || issueToUpdate.type;
    issueToUpdate.state = state || issueToUpdate.state;
  } catch (error) {
    if (!issueToUpdate) {
      return res.status(404).json({ error: "Issue not found" });
    } else {
      return res.json({ error: "Error updating the issue" });
    }
  }

  res.json({ issueToUpdate });
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

const addIssue = (req, res) => {
  const { title, type } = req.body;

  try {
    const newIssue = createIssue(title, type);
    issues.push(newIssue);
    return res.status(201).json({ message: "success", data: newIssue });
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
