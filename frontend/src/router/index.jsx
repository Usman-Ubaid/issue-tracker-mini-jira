import { Routes, Route } from "react-router-dom";
import KanbanBoard from "../pages/KanbanBoard";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
