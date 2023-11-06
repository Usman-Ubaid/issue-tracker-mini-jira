import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SelectOptions from "../formComponents/SelectOptions";
import ModalHeader from "./modalComponents/ModalHeader";
import InputButton from "../formComponents/InputButton";

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

  const selectIssueOption = (parentIssue, issuesData) => {
    let filterType;
    let filterIssues;

    if (parentIssue?.type === "Epic") {
      filterType = "Epic";
      filterIssues = issuesData?.filter((item) => item.type !== filterType);
    } else if (parentIssue?.type === "Story") {
      filterType = "Task";
      filterIssues = issuesData?.filter((item) => item.type === filterType);
    }

    return filterIssues;
  };

  const handleChildIssue = async (parentIssue, childId) => {
    const { issueId, children } = parentIssue;
    const checkExisingChildId = children.includes(Number(childId));

    if (checkExisingChildId) {
      window.alert("Child Already added.");
      reset({ issues: "" });
      setChildModalIsOpen(false);
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/${issueId}/childIssue`,
          {
            method: "PUT",
            body: JSON.stringify({ childId: childId }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const newData = await response.json();
        setData(newData.data);
        reset({ issues: "" });
        setChildModalIsOpen(false);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <>
      <Modal isOpen={childModalIsOpen} className="modal-container">
        <div className="modal-overlay">
          <ModalHeader
            heading={`Link Child Issue to ${updateIssue && updateIssue.title}`}
            closeModal={closeModal}
          />

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
                {...register("issues")}
                value={childIssueId}
                onChange={(e) => setChildIssueId(e.target.value)}
              >
                <option value="">Select an Issue</option>
                <SelectOptions
                  options={selectIssueOption(updateIssue, issuesData)}
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
