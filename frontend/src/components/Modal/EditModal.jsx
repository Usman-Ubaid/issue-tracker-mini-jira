import { useState } from "react";
import Modal from "react-modal";

const EditModal = ({ modalIsOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={modalIsOpen}>
        <button onClick={closeModal}>x</button>
        <form className="add-issue-form">
          <h2>Update Issue</h2>
          <input placeholder="Title of the Issue" />
          <select>
            <option>Epic</option>
            <option>Story</option>
            <option>Task</option>
          </select>
          <select>
            <option>ToDo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <input type="submit" className="button" value="Update" />
        </form>
      </Modal>
    </>
  );
};
export default EditModal;
