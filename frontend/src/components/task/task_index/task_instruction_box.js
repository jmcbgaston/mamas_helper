import React from "react";
import CloseIcon from '@material-ui/icons/Close';

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
          <p>
            Getting started is simple. Create a task, then select the task to
            edit it, or add requirements.
          </p>
          <br />
          <p>Task: Jesse's soccer game</p>
          <br />
          <p>Requirements:</p>
          <p>- car keys</p>
          <p>- wallet</p>
          <p>- soccer</p>
          <p>- ball</p>
          <p>- orange slices for the team</p>
          <br />
          <p>
            Once your tasks are set up, get your day started by choosing the
            tasks on your to-do list so that you can make sure that you have
            everything you need to get things done.
          </p>
          {copyId ? (
            <div>
              <br />
              <h4>Set up your household</h4>
              <p>
                Use this button below to copy your user ID to your clipboard. A
                new user can assign themselves to your household while
                registering.
              </p>
              <button
                className="nav-bar___user-id"
                onClick={() => {
                  navigator.clipboard.writeText(copyId);
                }}
              >
                User ID
              </button>
              <p>
                After adding a limited user to your household, Mama's Helper
                allows you to assign tasks to members of your household. 
                <br/>
                Limited users are able to mark a task as completed, which changes
                the color of the check mark from red to green.
              </p>
            </div>
          ) : (
            <div>
              <br />
              <h4>Receiving assigned tasks</h4>
              <p>
                As a limited user, you will be assigned tasks from the parent
                user of your household. 
                <br/>Limited users are able to mark a task as
                completed using the slider, which updates the status with the parent user.
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
