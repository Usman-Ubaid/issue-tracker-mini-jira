import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { postData } from "../services/api";

const AddIssueModal = ({ modalIsOpen, setModalIsOpen }) => {
  const { register, handleSubmit } = useForm();

  console.log(modalIsOpen);

  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      minHeight: "400px",
      minWidth: "500px",
    },
  };

  const handlePostData = async (formData) => {
    await postData(formData);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <div className="add-issue">
        <div className="modal-header">
          <h2>Create Issue</h2>
          <button onClick={closeModal}>Close</button>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            await handlePostData(data);
          })}
          className="add-issue-form"
        >
          <input
            {...register("title", { required: true })}
            placeholder="Title of the Issue"
          />
          <select {...register("type", { required: true })}>
            <option>Epic</option>
            <option>Story</option>
            <option>Task</option>
          </select>
          <input type="submit" className="button" value="Add" />
        </form>
      </div>
    </Modal>
  );
};

export default AddIssueModal;
