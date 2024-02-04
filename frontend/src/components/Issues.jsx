import { useNavigate } from "react-router-dom";

const Issues = ({ data }) => {
  const navigate = useNavigate();

  const openIssueModal = (id) => {
    navigate(`/issue/${id}`);
  };

  return (
    <>
      {data &&
        data.map((item) => (
          <div
            key={item._id}
            className="issue-card"
            onClick={() => openIssueModal(item._id)}
          >
            <p>{item.title}</p>
            <span>{item.issueType}</span>
          </div>
        ))}
      {!data && <div>No Issues</div>}
    </>
  );
};

export default Issues;
