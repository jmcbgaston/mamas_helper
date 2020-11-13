import React from 'react';

const TaskShowDeleteConfirmation = ({ history, handleDelete, handleDeleteArg, handleCancel }) => {
  return (
    <div className="delete-confirmation">
      <div className="delete-confirmation__content">
        <div className="delete-confirmation__warning">
          Are you sure you want to delete this item?
        </div>
        <div className="delete-confirmation__buttons-container">
          <button type="button"
            className="delete-confirmation__confirm-button delete-confirmation__button"
            onClick={() => {
              handleDelete(handleDeleteArg);
              history.goBack();
            }}>
            Delete
          </button>
          <button type="button"
            className="delete-confirmation__cancel-button delete-confirmation__button"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskShowDeleteConfirmation;
