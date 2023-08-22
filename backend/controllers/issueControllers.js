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

const addIssue = (req, res) => {
  const { title, type } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!type) {
    return res.status(400).json({ error: "Type is requried" });
  }

  const issue = {
    issueId: Math.ceil(Math.random() * 100),
    title,
    type,
    state: "ToDo",
  };

  issues.push(issue);

  return res.status(201).json({ success: true, data: issues });
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

export { getIssues, addIssue, deleteIssue, updateIssue };
