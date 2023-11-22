import Modal from "react-modal";
import { useForm } from "react-hook-form";
import SelectOptions from "../FormComponents/SelectOptions";
import ModalHeader from "./modalComponents/ModalHeader";
import InputButton from "../FormComponents/InputButton";

const EditIssueModal = ({
  modalIsOpen,
  updateIssue,
  setModalIsOpen,
  postUpdatedIssue,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const handleUpdateIssue = (data) => {
    updateIssue = {
      ...updateIssue,
      title: data.title !== "" ? data.title : updateIssue.title,
      type: data.issueType,
      state: data.issueState,
    };
    postUpdatedIssue(updateIssue);
    setModalIsOpen(false);
    reset({ title: "", issueType: "", issueState: "" });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    reset({ title: "" });
  };

  Modal.setAppElement("#root");

  const selectTypeOptions = [
    { id: 1, title: "Select Type", optionValue: "" },
    { id: 2, title: "Epic", optionValue: "Epic" },
    { id: 3, title: "Story", optionValue: "Story" },
    { id: 4, title: "Task", optionValue: "Task" },
  ];

  const selectStateOptions = [
    { id: 1, title: "Select Type", optionValue: "" },
    { id: 2, title: "ToDo", optionValue: "ToDo" },
    { id: 3, title: "InProgress", optionValue: "InProgress" },
    { id: 4, title: "Done", optionValue: "Done" },
  ];

  return (
    <>
      <Modal isOpen={modalIsOpen} className="modal-container">
        <div className="modal-overlay">
          <ModalHeader heading="Edit Issue" closeModal={closeModal} />
          <form
            onSubmit={handleSubmit(handleUpdateIssue)}
            className="add-issue-form"
          >
            <input {...register("title")} placeholder="Title of the Issue" />
            <select {...register("issueType", { required: true })}>
              <SelectOptions options={selectTypeOptions} />
            </select>
            <select {...register("issueState", { required: true })}>
              <SelectOptions options={selectStateOptions} />
            </select>
            <InputButton buttonValue="Edit Issue" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditIssueModal;
