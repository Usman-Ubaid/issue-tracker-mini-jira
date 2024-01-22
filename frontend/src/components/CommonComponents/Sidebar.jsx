import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="head">
        <h3>Project 1</h3>
        <span>Software Project</span>
      </div>
      <div className="list-items">
        <ul>
          <li>
            <Link>Kanban Board</Link>
          </li>
          <li>
            <Link>Create Issue</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
