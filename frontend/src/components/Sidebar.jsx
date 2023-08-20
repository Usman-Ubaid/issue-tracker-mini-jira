import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const tabs = [
    { id: 1, name: "All Issues", path: "/" },
    { id: 2, name: "Create Issue", path: "/addIssue" },
  ];

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
            <NavLink to={tab.path} className="nav-link">
              {tab.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
