import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArchiveIcon from '@material-ui/icons/Archive';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const TaskInstructionBox = ({ handleClose, copyId }) => {
  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button
            className="task-index__task-list-button"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="task-index__task-list-header">Instructions</div>
        <div className="task-instruction-box">
          <br />
          <h3>Getting started</h3>
          <br />
          <p>
            Getting started is simple. Create a task, then click the task name to
            edit it and add requirements.
          </p>
          <br />
          <p>
            Select tasks to view all your tasks and requirements in one simple
            list <VisibilityIcon />, archive your tasks for later use
            <ArchiveIcon />, or clearing the assigned user(s) & completion
            status <ClearAllIcon />.
          </p>
          {copyId ? (
            <div>
              <br />
              <h3>Set up your household</h3>
              <br />
              <p>
                After adding a child user to your household, Mama's Helper
                allows you to assign them tasks to complete.
              </p>
              <br/>
              <p>
                Copy the User ID below to your clipboard. A new user can assign
                themselves to your household while registering.
              </p>
              <p> User ID: {copyId}</p>
            </div>
          ) : (
            <div>
              <br />
              <h3>Receiving assigned tasks</h3>
              <p>
                As a child user, you will be assigned tasks from the parent
                user of your household. Mark them as complete, using the slider button.
              </p>
              <p>
                <br />
                You cannot edit tasks that you are assigned, but you are free to
                create and edit your own tasks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskInstructionBox;
