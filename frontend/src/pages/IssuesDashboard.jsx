import Layout from "../components/Layout";

const IssuesDashboard = () => {
  const tableHeadings = [{ id: "Id", title: "Title", type: "Type" }];

  const issues = [
    { id: 1, issueTitle: "Develop UI", issueType: "Epic" },
    { id: 2, issueTitle: "Develop API", issueType: "Story" },
    { id: 3, issueTitle: "Integrate API", issueType: "Task" },
  ];
  return (
    <Layout>
      <div className="issues-dashboard">
        <h2>Issues Dashboard</h2>
        <h3>View All Issues</h3>
        <table>
          <thead>
            {tableHeadings.map((heading) => (
              <tr>
                <th>{heading.id}</th>
                <th>{heading.title}</th>
                <th>{heading.type}</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.issueTitle}</td>
                <td>{issue.issueType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default IssuesDashboard;
