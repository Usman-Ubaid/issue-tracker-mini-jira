import Modal from "react-modal";
import { useForm } from "react-hook-form";

const AddChildModal = ({ childModalIsOpen, setChildModalIsOpen }) => {
  const { register, handleSubmit } = useForm();

  Modal.setAppElement("#root");

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

  const closeModal = () => {
    setChildModalIsOpen(false);
  };

  const handleExistingChildIssue = () => {
    console.log("Handle existing child issue");
  };

  return (
    <>
      <Modal isOpen={childModalIsOpen} style={customStyles}>
        <div className="child-modal">
          <div className="modal-header">
            <h2>Link/Add Child Issue</h2>
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
                  <option>Issue 1</option>
                  <option>Issue 2</option>
                  <option>Issue 3</option>
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
