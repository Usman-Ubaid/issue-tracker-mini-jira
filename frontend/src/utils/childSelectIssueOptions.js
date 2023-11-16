export const childSelectIssueOptions = (parentIssue, issuesData) => {
  let filterType;
  let filterIssues;

  if (parentIssue?.type === "Epic") {
    filterType = "Epic";
    filterIssues = issuesData?.filter((item) => item.type !== filterType);
  } else if (parentIssue?.type === "Story") {
    filterType = "Task";
    filterIssues = issuesData?.filter((item) => item.type === filterType);
  }

  return filterIssues;
};
