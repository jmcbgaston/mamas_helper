import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const TaskIndexCreateModal = ({ handleClose }) => {
  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button className="task-index__task-list-button" onClick={handleClose}>
             <CloseIcon/>
          </button>
          <span className="task-index__task-list-header">Your task has been added!</span>
        </div>
        <p>To add Requirements to this task, please select the Task and then select Edit Task.</p>
      </div>
    </div>
  )
}

export default TaskIndexCreateModal;
