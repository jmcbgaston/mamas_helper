import React from "react";
import CloseIcon from '@material-ui/icons/Close';

const TaskInstructionBox = ({ handleClose }) => {
  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button className="task-index__task-list-button" onClick={handleClose}>
              <CloseIcon/>
          </button>
          <span className="task-index__task-list-header">Instructions</span>
        </div>
        <div className="task-instruction-box">
          <p>
            Getting started is simple. Create a task, then select the task to edit it, or add requirements.
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
            Once your tasks are set up, get your day started by choosing the tasks
            on your to-do list so that you can make sure that you have everything
            you need to get things done.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskInstructionBox;
