import { Routes, Route } from "react-router-dom";
import IssuesDashboard from "../pages/IssuesDashboard";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IssuesDashboard />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
