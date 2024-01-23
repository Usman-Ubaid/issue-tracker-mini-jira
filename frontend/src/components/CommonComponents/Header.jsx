import { useState } from "react";
import CreateIssueModal from "../Modal/CreateIssueModal";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const createIssueHandler = () => {
    setModalIsOpen(true);
  };
  return (
    <div className="header">
      <div className="header-content">
        <h1>Kanban Board</h1>
        <button onClick={createIssueHandler}>Create Issue</button>
        <CreateIssueModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    </div>
  );
};

export default Header;
