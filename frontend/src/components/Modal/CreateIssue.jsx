import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../../services/api";
import { useData } from "../../hooks/DataContext";
import { fetchData } from "../../services/api";

const CreateIssueModal = ({ modalIsOpen, closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      issueSummary: "",
      issueType: {},
    },
  });

  const { addIssue, data } = useData();

  Modal.setAppElement("#root");

  const options = [
    { value: "Epic", label: "Epic" },
    { value: "Story", label: "Story" },
    { value: "Task", label: "Task" },
  ];

  const onSubmit = async (formData) => {
    await postData(formData);
    addIssue(formData);
    reset({ issueSummary: "", issueType: {} });
    closeModal();
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-container"
    >
      <div className="modal-overlay">
        <h2>Create Issue</h2>
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="add-issue-form"
        >
          <label htmlFor="issueType">Issue Type</label>
          <Controller
            name="issueType"
            control={control}
            rules={{ required: true }}
            render={({ field, value }) => (
              <Select
                {...field}
                id="issueType"
                value={options.find((option) => option.value === value)}
                options={options}
                required
              />
            )}
          />

          <hr className="divide-line"></hr>

          <label htmlFor="issueSummary">Short Summary</label>
          <Controller
            name="issueSummary"
            control={control}
            render={({ field }) => <input {...field} id="issueSummary" />}
            rules={{ required: true }}
          />

          <div className="btn-group">
            <button className="btn">Create Issue</button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateIssueModal;
