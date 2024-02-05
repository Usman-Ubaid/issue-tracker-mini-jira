import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import KanbanBoard from "../../pages/KanbanBoard";
import { deleteIssue, updateIssueType } from "../../services/api";
import { useData } from "../../hooks/DataContext";

const issueStatus = [
  { value: "ToDo", label: "ToDo" },
  { value: "InProgress", label: "InProgress" },
  { value: "Done", label: "Done" },
];

const issueType = [
  { value: "Epic", label: "Epic" },
  { value: "Story", label: "Story" },
  { value: "Task", label: "Task" },
];

const IssueModal = () => {
  const { control } = useForm();
  const { setData } = useData();
  const navigate = useNavigate();
  const { id } = useParams();

  const closeIssue = () => {
    navigate("/");
  };

  const handleDeleteIssue = async () => {
    const res = await deleteIssue(id);
    if (res) {
      setData((prevData) => {
        const updatedData = prevData.filter((issue) => issue._id !== id);
        return updatedData;
      });
      console.log("Issue removed");
      navigate("/");
    } else {
      console.log("Failed to delete the issue");
    }
  };

  const handleIssueTypeChange = async (selectedOption) => {
    const res = await updateIssueType(id, selectedOption.value);
    console.log(res.message);
    setData((prevData) => {
      const updatedData = prevData.map((issue) =>
        issue._id === id ? { ...issue, issueType: selectedOption.value } : issue
      );
      return updatedData;
    });
  };

  return (
    <div>
      <KanbanBoard />
      <div className="modal-container">
        <div className="modal-overlay">
          <div className="modal-header">
            <Controller
              name="issueType"
              control={control}
              render={({ field }) => (
                <Select
                  id="issueType"
                  name="issueType"
                  options={issueType}
                  onChange={handleIssueTypeChange}
                  required
                />
              )}
            />
            <div>
              <button className="btn" onClick={handleDeleteIssue}>
                Delete
              </button>
              <button className="btn" onClick={closeIssue}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="left">
              <div className="summary-input">
                <input
                  type="text"
                  name="summary"
                  id="summary"
                  placeholder="Summary"
                />
              </div>
              <div className="comments">
                <span>Comments</span>
                <div className="comment">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Add a comment..."
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <div>
                <label htmlFor="issueStatus">Status</label>
                <div className="select">
                  <Select
                    id="issueStatus"
                    name="issueStatus"
                    options={issueStatus}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
