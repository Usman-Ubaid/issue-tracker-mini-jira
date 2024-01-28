import Issues from "./Issues";

const IssueCard = ({ heading }) => {
  return (
    <div className="issue-wrapper">
      <h4>{heading}</h4>
      <div>
        <Issues />
      </div>
    </div>
  );
};

export default IssueCard;
