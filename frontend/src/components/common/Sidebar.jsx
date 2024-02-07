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
            <Link to="/">Kanban Board</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
