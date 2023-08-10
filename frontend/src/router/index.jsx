import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddIssue from "../pages/AddIssue";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addIssue" element={<AddIssue />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
