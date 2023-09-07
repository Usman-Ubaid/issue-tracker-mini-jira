export const createIssue = (title, type) => {
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
    children: type === "Epic" || type === "Story" ? [] : null,
  };

  return issue;
};
