import { useState } from "react";
import CreateIssueModal from "../Modal/CreateIssue";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="header">
      <p>Projects / Project 1 / Kanban Board</p>
      <div className="header-content">
        <h1>Kanban Board</h1>
        <button onClick={openModal}>Create Issue</button>
        <CreateIssueModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Header;
