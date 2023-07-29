let issues = [];

const addIssue = (req, res) => {
  const { title, type } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  } else if (!type) {
    return res.status(400).json({ error: "Type is requried" });
  } else {
    const issue = {
      issueId: Math.ceil(Math.random() * 100),
      title,
      type,
    };
    issues = [...issues, issue];
  }

  return res.status(201).json({ success: true, data: issues });
};

export { addIssue };
