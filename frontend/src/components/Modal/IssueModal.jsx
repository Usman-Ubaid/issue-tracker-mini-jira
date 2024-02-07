import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useState, useEffect } from "react";
import KanbanBoard from "../../pages/KanbanBoard";
import {
  deleteIssueApi,
  updateIssueType,
  getIssueById,
} from "../../services/api";
import { useData } from "../../hooks/DataContext";

const IssueModal = () => {
  const [selectedIssue, setSelectedIssue] = useState({
    _id: "",
    issueType: "",
    title: "",
    state: "",
  });

  const { control } = useForm();
  const { data, deleteIssue } = useData();
  const navigate = useNavigate();
  const { id } = useParams();

  const issueState = [
    { value: "ToDo", label: "ToDo" },
    { value: "InProgress", label: "InProgress" },
    { value: "Done", label: "Done" },
  ];

  const issueType = [
    { value: "Epic", label: "Epic" },
    { value: "Story", label: "Story" },
    { value: "Task", label: "Task" },
  ];

  const closeIssue = () => {
    navigate("/");
  };
  const fetchIssueById = async () => {
    const result = await getIssueById(id);
    setSelectedIssue(result?.issue);
  };

  useEffect(() => {
    fetchIssueById();
  }, [id]);

  const handleDeleteIssue = async () => {
    const res = await deleteIssueApi(id);
    if (res) {
      deleteIssue(id);
      console.log("Issue removed");
      navigate("/");
    } else {
      console.log("Failed to delete the issue");
    }
  };

  const handleIssueTypeChangeApi = async (selectedOption) => {
    const res = await updateIssueType(id, selectedOption.value);
    console.log(res.message);

    const updatedIssues = data.map((issue) => {
      if (issue._id === id) {
        return { ...issue, issueType: selectedOption.value };
      }
      return issue;
    });
    if (res) {
      // setData(updatedIssues);

      setSelectedIssue((prevValue) => ({
        ...prevValue,
        issueType: selectedOption.value,
      }));
    } else {
      console.log("Failed to update issue type");
    }
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
              rules={{ required: true }}
              render={() => (
                <Select
                  id="issueType"
                  options={issueType}
                  value={issueType.find(
                    (option) =>
                      option.value === (selectedIssue?.issueType || "")
                  )}
                  onChange={(option) => handleIssueTypeChangeApi(option)}
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
          {/* <div className="modal-body">
            <div className="left">
              <div className="summary-input">
                <input
                  type="text"
                  name="issueSummary"
                  id="issueSummary"
                  placeholder="Summary"
                  value={selectedIssue?.title}
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
                <label htmlFor="issueState">Status</label>
                <div className="select">
                  <Select
                    id="issueState"
                    name="issueState"
                    options={issueState}
                    required
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
