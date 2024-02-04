import { Routes, Route } from "react-router-dom";
import KanbanBoard from "../pages/KanbanBoard";
import IssueModal from "../components/Modal/IssueModal";

const ReactRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/issue/:id" element={<IssueModal />} />
      </Routes>
    </>
  );
};

export default ReactRouter;
