import Modal from "react-modal";
import Select from "react-select";

Modal.setAppElement("#root");

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

const IssueModal = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-container"
    >
      <div className="modal-overlay">
        <div className="modal-header">
          <Select id="issueType" options={issueType} required />
          <div>
            <button className="btn">Delete</button>
            <button className="btn" onClick={closeModal}>
              Cancel
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
    </Modal>
  );
};

export default IssueModal;
