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
  const filterIssues = issues.filter((issue) => {
    return issue.issueId !== id;
  });

  if (filterIssues.length === issues.length) {
    return res.json({ error: "ID does not exist" });
  }

  issues = filterIssues;

  res.json({ message: "success", data: issues });
};

export { getIssues, addIssue, deleteIssue };
