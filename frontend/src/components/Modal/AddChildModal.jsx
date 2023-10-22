import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SelectOption = ({ parentIssue, issuesData }) => {
  let filterType;
  let filterIssues;

  if (parentIssue.type === "Epic") {
    filterType = "Epic";
    filterIssues = issuesData?.filter((item) => item.type !== filterType);
  } else if (parentIssue.type === "Story") {
    filterType = "Task";
    filterIssues = issuesData?.filter((item) => item.type === filterType);
  } else {
    return null;
  }

  return filterIssues.map((issue) => (
    <option value={issue.issueId} key={issue.issueId}>
      {issue.issueId}. {issue.title}
    </option>
  ));
};

const AddChildModal = ({
  childModalIsOpen,
  setChildModalIsOpen,
  issuesData,
  updateIssue,
}) => {
  const { handleSubmit } = useForm();
  const [childIssueId, setChildIssueId] = useState(undefined);

  Modal.setAppElement("#root");

  const closeModal = () => {
    setChildModalIsOpen(false);
  };

  const handleExistingChildIssue = async (parentIssue, childId) => {
    const { issueId, children } = parentIssue;
    const checkExisingChildId = children.some(
      (child) => child === Number(childId)
    );

    if (checkExisingChildId) {
      window.alert("Child Already added.");
      setChildModalIsOpen(false);
    } else {
      try {
        await fetch(`http://localhost:5000/api/issues/${issueId}/childIssue`, {
          method: "PUT",
          body: JSON.stringify({ childId: childId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setChildModalIsOpen(false);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      paddingBottom: "5%",
      borderRadius: "15px",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Modal isOpen={childModalIsOpen} style={customStyles}>
        <div className="child-modal">
          <div className="modal-header">
            <h2>Link Child Issue to {updateIssue && updateIssue.title}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <form
            className="add-issue-form"
            onSubmit={handleSubmit(() => {
              if (childIssueId) {
                handleExistingChildIssue(updateIssue, childIssueId);
              }
            })}
          >
            <div className="fieldset-container">
              <fieldset>
                <legend>
                  <h3>Add from Existing Child Issues</h3>
                </legend>
                {issuesData && (
                  <select
                    value={childIssueId}
                    onChange={(e) => setChildIssueId(e.target.value)}
                  >
                    <option value="select-issue">Select an Issue</option>
                    <SelectOption
                      parentIssue={updateIssue}
                      issuesData={issuesData}
                    />
                  </select>
                )}
              </fieldset>
            </div>

            <input type="submit" className="button" value="Add Child Issue" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default AddChildModal;
