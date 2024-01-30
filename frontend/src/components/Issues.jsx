import { useState } from "react";
import IssueModal from "./Modal/IssueModal";

const Issues = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = (e) => {
    setModalIsOpen(false);
    e.stopPropagation();
  };

  return (
    <>
      {data &&
        data.map((item) => (
          <div key={item._id} className="issue-card" onClick={openModal}>
            <p>{item.title}</p>
            <span>{item.issueType}</span>
          </div>
        ))}
      {!data && <div>No Issues</div>}

      <IssueModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default Issues;
