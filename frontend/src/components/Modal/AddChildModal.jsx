import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SelectOptions from "../FormComponents/SelectOptions";

// const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => {
//   return (
//     <>
//       <label>{label}</label>
//       <select
//         name={name}
//         ref={ref}
//         onChange={() => console.log(onChange)}
//         onBlur={onBlur}
//       >
//         <option value="20">20</option>
//         <option value="30">30</option>
//       </select>
//     </>
//   );
// });

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
        setChildIssueId("");
        setChildModalIsOpen(false);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

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
      <Modal isOpen={childModalIsOpen} style={customStyles}>
        <div className="child-modal">
          <div className="modal-header">
            <h2>Link Child Issue to {updateIssue && updateIssue.title}</h2>
            <button onClick={closeModal}>Close</button>
          </div>

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

            <input
              type="submit"
              className="button"
              value="Add Child Issue"
              onClick={() => reset({ issues: "" })}
            />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default AddChildModal;
