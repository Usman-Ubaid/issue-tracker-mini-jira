import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { postData } from "../services/api";
import { useData } from "../hooks/DataContext";
import { fetchData } from "../services/api";
import SelectOptions from "../components/FormComponents/SelectOptions";

const AddIssueModal = ({ modalIsOpen, setModalIsOpen }) => {
  const { register, handleSubmit, reset } = useForm();
  const { setData } = useData();

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
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <div>
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
            {...register("issueTitle", { required: true })}
            placeholder="Title of the Issue"
          />

          <select {...register("issueType", { required: true })}>
            <SelectOptions options={selectOptions} />
          </select>
          <input type="submit" className="button" value="Add Issue" />
        </form>
      </div>
    </Modal>
  );
};

export default AddIssueModal;
