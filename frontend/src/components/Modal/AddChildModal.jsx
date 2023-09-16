import Modal from "react-modal";
import { useForm } from "react-hook-form";

const AddChildModal = ({
  childModalIsOpen,
  setChildModalIsOpen,
  data,
  updateIssue,
}) => {
  const { register, handleSubmit } = useForm();

  Modal.setAppElement("#root");

  const SelectOption = ({ updateIssue }) => {
    let filterType;
    let filterIssues;

    if (updateIssue.type === "Epic") {
      filterType = "Epic";
      filterIssues = data?.filter((item) => item.type !== filterType);
    } else if (updateIssue.type === "Story") {
      filterType = "Task";
      filterIssues = data?.filter((item) => item.type === filterType);
    } else {
      return null;
    }

    return filterIssues.map((issue) => (
      <option key={issue.issueId}>
        {issue.issueId}. {issue.title}
      </option>
    ));
  };

  const closeModal = () => {
    setChildModalIsOpen(false);
  };

  const handleExistingChildIssue = () => {
    console.log("Handle existing child issue");
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
            <h2>
              Link/Add Child Issue to {updateIssue && updateIssue.issueId}
            </h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <form
            className="add-issue-form"
            onSubmit={handleSubmit(handleExistingChildIssue)}
          >
            <div className="fieldset-container">
              <fieldset>
                <legend>
                  <h3>Add from Existing Child Issues</h3>
                </legend>
                <select>
                  <option>Select Issue</option>
                  <SelectOption updateIssue={updateIssue} />
                  {/* {data?.map((item) => (
                    <option key={item.issueId}>
                      {item.issueId}. {item.title}
                    </option>
                  ))} */}
                </select>
              </fieldset>

              <fieldset>
                <legend>
                  <h3>Add New Child Issue</h3>
                </legend>
                <input
                  {...register("title")}
                  placeholder="Title of the Issue"
                />

                <select {...register("type")}>
                  <option value="Epic">Epic</option>
                  <option value="Story">Story</option>
                  <option value="Task">Task</option>
                </select>

                <select {...register("state")}>
                  <option value="ToDo">ToDo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
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
