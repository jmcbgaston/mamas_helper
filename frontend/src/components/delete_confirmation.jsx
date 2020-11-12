import React from 'react';

const DeleteConfirmation = ({ history, taskId, handleDelete, handleCancel }) => (
  <div className="delete-confirmation">
    <div className="delete-confirmation__content">
      <div className="delete-confirmation__warning">Are you sure?</div>
      <div>
        <button type="button"
          className="delete-confirmation__confirm-button delete-confirmation__button"
          onClick={() => {
            handleDelete(taskId);
            history.push('/');
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

export default DeleteConfirmation;
