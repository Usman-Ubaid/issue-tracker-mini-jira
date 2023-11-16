import Modal from "react-modal";
import { useForm } from "react-hook-form";
import SelectOptions from "../formComponents/SelectOptions";
import ModalHeader from "./modalComponents/ModalHeader";
import InputButton from "../formComponents/InputButton";

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
      <Modal isOpen={modalIsOpen} className="modal-container">
        <div className="modal-overlay">
          <ModalHeader
            heading={`Update ${updateIssue && updateIssue.title} Issue`}
            closeModal={closeModal}
          />
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
            <InputButton buttonValue="Edit Issue" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditModal;
