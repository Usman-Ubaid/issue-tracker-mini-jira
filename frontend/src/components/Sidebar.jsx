import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const tabs = [{ id: 1, name: "Create Issue", path: "/addIssue" }];

  return (
    <div className="sidebar">
      <h1>Issue Tracker</h1>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${
              location.pathname === tab.path ? "active-tab" : "default-tab"
            } `}
          >
            <NavLink to="/addIssue" className="nav-link">
              Create Issue
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
