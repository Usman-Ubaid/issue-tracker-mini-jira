import Modal from "react-modal";
import { useForm } from "react-hook-form";
import SelectOptions from "../FormComponents/SelectOptions";

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
      type: data.issueType,
      state: data.issueState,
    };
    postUpdatedIssue(updateIssue);
    setModalIsOpen(false);
  };

  const closeModal = () => {
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

  const typeOptions = [
    { id: 1, title: "Epic" },
    { id: 2, title: "Story" },
    { id: 3, title: "Task" },
  ];

  const stateOptions = [
    { id: 1, title: "ToDo" },
    { id: 2, title: "InProgress" },
    { id: 3, title: "Done" },
  ];

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="child-modal">
          <div className="modal-header">
            <h2>Update "{updateIssue && updateIssue.title}" Issue</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateIssue)}
            className="add-issue-form"
          >
            <input {...register("title")} placeholder="Title of the Issue" />
            <select {...register("issueType")}>
              <SelectOptions options={typeOptions} />
            </select>
            <select {...register("issueState")}>
              <SelectOptions options={stateOptions} />
            </select>
            <input type="submit" className="button" value="Edit Issue" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditModal;
