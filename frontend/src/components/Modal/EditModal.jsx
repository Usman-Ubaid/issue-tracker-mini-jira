import Modal from "react-modal";
import { useForm } from "react-hook-form";

const EditModal = ({
  modalIsOpen,
  updateIssue,
  setModalIsOpen,
  postUpdatedIssue,
}) => {
  const { register, handleSubmit } = useForm();

  const handleUpdateIssue = (data) => {
    updateIssue = {
      ...updateIssue,
      title: data.title !== "" ? data.title : updateIssue.title,
      type: data.type,
      state: data.state,
    };
    postUpdatedIssue(updateIssue);

    setModalIsOpen(false);
  };

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

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <form
          onSubmit={handleSubmit(handleUpdateIssue)}
          className="add-issue-form"
        >
          <h2>Update Issue {updateIssue && updateIssue.issueId}</h2>
          <input {...register("title")} placeholder="Title of the Issue" />

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

          <input type="submit" className="button" value="Update" />
        </form>
      </Modal>
    </>
  );
};
export default EditModal;
