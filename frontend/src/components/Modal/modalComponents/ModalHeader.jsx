const ModalHeader = ({ heading, closeModal }) => {
  return (
    <div className="modal-header">
      <h2>{heading}</h2>
      <button onClick={closeModal}>X</button>
    </div>
  );
};

export default ModalHeader;
