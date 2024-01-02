export const createIssue = (title, type) => {
  const issue = {
    title,
    type,
    state: "ToDo",
    children: type === "Epic" || type === "Story" ? [] : null,
  };

  return issue;
};
