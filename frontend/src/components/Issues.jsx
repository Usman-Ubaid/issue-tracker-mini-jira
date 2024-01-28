import { useState } from "react";
import IssueModal from "./Modal/IssueModal";

const Issues = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = (e) => {
    setModalIsOpen(false);
    e.stopPropagation();
  };

  return (
    <div className="issue-card" onClick={openModal}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia odit
        asperiores adipisci obcaecati eius aspernatur cum sapiente laborum
        architecto hic?
      </p>
      <span>Task</span>

      <IssueModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Issues;
