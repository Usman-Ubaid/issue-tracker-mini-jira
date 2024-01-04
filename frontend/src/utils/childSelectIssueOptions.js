export const childSelectIssueOptions = (parentIssue, issuesData) => {
  let filterType;
  let filterIssues;

  if (parentIssue?.issueType === "Epic") {
    filterType = "Epic";
    filterIssues = issuesData?.filter((item) => item.issueType !== filterType);
  } else if (parentIssue?.issueType === "Story") {
    filterType = "Task";
    filterIssues = issuesData?.filter((item) => item.issueType === filterType);
  }

  return filterIssues;
};
