import Layout from "../components/common/Layout";
import { useData } from "../hooks/DataContext";
import IssueCard from "../components/IssueCard";

const KanbanBoard = () => {
  const { data } = useData();

  const todoIssues = data?.filter((issue) => issue.state === "ToDo");
  const inProgressIssues = data?.filter(
    (issue) => issue.state === "InProgress"
  );
  const doneIssues = data?.filter((issue) => issue.state === "Done");

  return (
    <Layout>
      <div className="board">
        <div className="board-header">
          <IssueCard heading="ToDo" issues={todoIssues} />
          <IssueCard heading="InProgress" issues={inProgressIssues} />
          <IssueCard heading="Done" issues={doneIssues} />
        </div>
      </div>
    </Layout>
  );
};

export default KanbanBoard;
