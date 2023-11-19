import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { postData } from "../../services/api";
import { useData } from "../../hooks/DataContext";
import { fetchData } from "../../services/api";
import SelectOptions from "../formComponents/SelectOptions";
import ModalHeader from "./modalComponents/ModalHeader";
import InputButton from "../formComponents/InputButton";

const CreateIssueModal = ({ modalIsOpen, setModalIsOpen }) => {
  const { register, handleSubmit, reset } = useForm();
  const { setData } = useData();

  Modal.setAppElement("#root");

  const handlePostData = async (formData) => {
    await postData(formData);
    const fetchedData = await fetchData();
    setData(fetchedData.data);
    reset({ issueTitle: "", issueType: "" });
    setModalIsOpen(false);
  };

  const closeModal = () => {
    reset({ issueTitle: "", issueType: "" });
    setModalIsOpen(false);
  };

  const selectOptions = [
    { id: 1, title: "Select Type", optionValue: "" },
    { id: 2, title: "Epic", optionValue: "Epic" },
    { id: 3, title: "Story", optionValue: "Story" },
    { id: 4, title: "Task", optionValue: "Task" },
  ];

  return (
    <Modal isOpen={modalIsOpen} className="modal-container">
      <div className="modal-overlay">
        <ModalHeader heading="Create Issue" closeModal={closeModal} />

        <form
          onSubmit={handleSubmit(async (data) => {
            await handlePostData(data);
          })}
          className="add-issue-form"
        >
          <input
            {...register("issueTitle", { required: true })}
            placeholder="Title of the Issue"
          />

          <select {...register("issueType", { required: true })}>
            <SelectOptions options={selectOptions} />
          </select>
          <InputButton buttonValue="Add Issue" />
        </form>
      </div>
    </Modal>
  );
};

export default CreateIssueModal;
