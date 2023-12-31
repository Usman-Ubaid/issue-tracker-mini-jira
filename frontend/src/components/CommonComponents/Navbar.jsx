import { useState } from "react";
import { NavLink } from "react-router-dom";
import CreateIssueModal from "../Modal/CreateIssueModal";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const createIssueHandler = () => {
    setModalIsOpen(true);
  };
  return (
    <div className="navbar">
      <h1>IssueTracker</h1>
      <ul>
        <li className="nav-link-item">
          <NavLink>Dashboard</NavLink>
        </li>
        <li>
          <button onClick={createIssueHandler}>Create Issue</button>
        </li>
      </ul>
      <CreateIssueModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default Navbar;
