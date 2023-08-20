import { Routes, Route } from "react-router-dom";
import IssuesDashboard from "../pages/IssuesDashboard";
import AddIssue from "../pages/AddIssue";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IssuesDashboard />} />
        <Route path="/addIssue" element={<AddIssue />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
