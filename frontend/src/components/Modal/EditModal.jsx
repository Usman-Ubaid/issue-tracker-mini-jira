import Modal from "react-modal";
import Form from "../FormComponents/Form";

const EditModal = ({
  modalIsOpen,
  updateIssue,
  setModalIsOpen,
  postUpdatedIssue,
}) => {
  const handleUpdateIssue = (data) => {
    updateIssue = {
      ...updateIssue,
      title: data.title !== "" ? data.title : updateIssue.title,
      type: data.type,
      state: data.state,
    };
    postUpdatedIssue(updateIssue);

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

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Form
          handleUpdateIssue={handleUpdateIssue}
          updateIssue={updateIssue}
          title="title"
          placeholderText="Title of the Issue"
          buttonValue="update"
        />
      </Modal>
    </>
  );
};
export default EditModal;
