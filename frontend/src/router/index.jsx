import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
