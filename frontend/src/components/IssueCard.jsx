import { useNavigate } from "react-router-dom";

const IssueCard = ({ heading, issues }) => {
  const navigate = useNavigate();

  const openIssueModal = (id) => {
    navigate(`/issue/${id}`);
  };

  return (
    <div className="issue-wrapper">
      <h4>{heading}</h4>
      <div>
        {issues && issues.length ? (
          issues.map((issue) => (
            <div
              key={issue._id}
              className="issue-card"
              onClick={() => openIssueModal(issue._id)}
            >
              <p>{issue.title}</p>
              <span>{issue.issueType}</span>
            </div>
          ))
        ) : (
          <p>No issues found</p>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
