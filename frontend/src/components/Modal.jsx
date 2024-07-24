import React from "react";

import "../styles/Modal.css"

export const Modal = ({ onSubmit, onCancel, closeModal, children , confirm_button}) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div
          className="modal-header"
          onClick={() => closeModal("Modal was closed")}
        >
          <p className="close">&times;</p>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          {confirm_button}
        </div>
      </div>
    </div>
  );
};