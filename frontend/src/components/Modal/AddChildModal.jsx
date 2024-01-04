import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addChildIssue, fetchData } from "../../services/api";
import SelectOptions from "../FormComponents/SelectOptions";
import ModalHeader from "./modalComponents/ModalHeader";
import InputButton from "../FormComponents/InputButton";
import { childSelectIssueOptions } from "../../utils/childSelectIssueOptions";

const AddChildModal = ({
  childModalIsOpen,
  setChildModalIsOpen,
  issuesData,
  updateIssue,
  setData,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [childIssueId, setChildIssueId] = useState("");

  Modal.setAppElement("#root");

  const closeModal = () => {
    setChildModalIsOpen(false);
    reset({ issues: "" });
  };

  const handleChildIssue = async (parentIssue, childId) => {
    const { _id, children } = parentIssue;
    const checkExisingChildId = children.includes(childId);

    if (checkExisingChildId) {
      window.alert("Child Already added.");
      reset({ issues: "" });
      setChildModalIsOpen(false);
    } else {
      await addChildIssue(_id, childId);
      const fetchedData = await fetchData();
      setData(fetchedData.data);
      reset({ issues: "" });
      setChildModalIsOpen(false);
    }
  };

  return (
    <>
      <Modal isOpen={childModalIsOpen} className="modal-container">
        <div className="modal-overlay">
          <ModalHeader heading="Link Child Issue" closeModal={closeModal} />

          <form
            className="add-issue-form"
            onSubmit={handleSubmit(() => {
              if (childIssueId) {
                handleChildIssue(updateIssue, childIssueId);
              }
            })}
          >
            <fieldset>
              <legend>
                <h3>Add from Existing Child Issues</h3>
              </legend>
              <select
                {...register("issues", { required: true })}
                value={childIssueId}
                onChange={(e) => setChildIssueId(e.target.value)}
              >
                <option value="">Select an Issue</option>
                <SelectOptions
                  options={childSelectIssueOptions(updateIssue, issuesData)}
                />
              </select>
            </fieldset>
            <InputButton buttonValue="Add Child Issue" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default AddChildModal;
