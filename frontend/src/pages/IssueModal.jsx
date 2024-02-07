import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import { getIssueById } from "../services/api";
import { useData } from "../hooks/DataContext";

const IssueModal = () => {
  const [selectedIssue, setSelectedIssue] = useState({
    _id: "",
    issueType: "",
    title: "",
    state: "",
  });

  const { control } = useForm();
  const { deleteIssue, issueTypeChange, issueTitleChange, issueStatusChange } =
    useData();
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
    deleteIssue(id);
    navigate("/");
  };

  const handleIssueTypeChange = async (selectedOption) => {
    issueTypeChange(id, selectedOption.value);

    setSelectedIssue((prevValue) => ({
      ...prevValue,
      issueType: selectedOption.value,
    }));
  };

  const handleIssueStatusChange = async (selectedOption) => {
    issueStatusChange(id, selectedOption.value);

    setSelectedIssue((prevValue) => ({
      ...prevValue,
      state: selectedOption.value,
    }));
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setSelectedIssue((prevValue) => ({
      ...prevValue,
      title: newTitle,
    }));
  };

  const handleTitleChangeApi = () => {
    if (selectedIssue.title !== "") {
      issueTitleChange(id, selectedIssue.title);
    } else {
      console.log("Field is required");
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
                  onChange={(option) => handleIssueTypeChange(option)}
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
                  name="issueSummary"
                  id="issueSummary"
                  placeholder="Summary"
                  value={selectedIssue?.title}
                  onChange={handleTitleChange}
                  onBlur={handleTitleChangeApi}
                  required
                />
              </div>
              {/* <div className="comments">
                <span>Comments</span>
                <div className="comment">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Add a comment..."
                  />
                </div>
              </div> */}
            </div>
            <div className="right">
              <div className="select">
                <label htmlFor="issueState">Status</label>
                <Controller
                  name="issueState"
                  control={control}
                  rules={{ required: true }}
                  render={() => (
                    <Select
                      id="issueState"
                      name="issueState"
                      options={issueState}
                      value={issueState.find(
                        (option) =>
                          option.value === (selectedIssue?.state || "")
                      )}
                      onChange={(option) => handleIssueStatusChange(option)}
                      required
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
