let issues = [];

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
  };

  issues.push(issue);

  return res.status(201).json({ success: true, data: issues });
};

const deleteIssue = (req, res) => {
  const id = parseInt(req.params.id);
  issues = issues.filter((issue) => {
    return issue.issueId !== id;
  });

  res.json({ message: "success", data: issues });
};

export { addIssue, deleteIssue };
