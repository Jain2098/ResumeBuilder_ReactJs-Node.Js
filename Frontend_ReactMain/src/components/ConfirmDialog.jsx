import React, { Fragment, useState, useEffect } from "react";

export default function ConfirmDialog({ setIsFormDeleted, handleClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleConfirm = () => {
    setIsFormDeleted(true);
    handleClose();
  };

  return (
    <Fragment>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none", zIndex: 9999 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5 text-center w-100">
                Are you sure you want to delete this resume?
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
