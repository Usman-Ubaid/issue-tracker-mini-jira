import Issues from "./Issues";

const IssueCard = ({ heading, data }) => {
  return (
    <div className="issue-wrapper">
      <h4>{heading}</h4>
      <div>
        <Issues data={data} />
      </div>
    </div>
  );
};

export default IssueCard;
