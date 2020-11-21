import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import CheckIcon from '@material-ui/icons/Check';
import {green} from '@material-ui/core/colors';

const TaskIndexListItem = ({task, requirements}) => {

  // debugger

  return (
    <li>
      <p className="task-index__task-list-item-header">{task.title}</p>
      <ul>
        {requirements.length ?
          requirements.map((requirement) => {
            return (
              <li key={requirement._id} className="task-index__task-list-item-requirement">
                <CheckIcon style={{color: green[500]}}/>
                &nbsp;{requirement.description}
              </li>
            )
          })
          :
          <li className="task-index__task-list-item-requirement">
            (no requirements)
          </li>
        }
      </ul>
    </li>
  )
}

export const TaskIndexList = ({tasks, checkedTasksIds, handleEmailClick, handleClose}) => {

  const checked = Object.keys(checkedTasksIds)
  .filter((taskId) => checkedTasksIds[taskId]);

  // debugger

  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button
            className="task-index__task-list-button"
            onClick={() => {
              Array.from(document.querySelectorAll('.task-index__list-item-checkbox'))
        .       forEach((checkbox) => checkbox.checked = false );
              handleClose();
            }}>
             <CloseIcon/>
          </button>
          <span className="task-index__task-list-header">Task List</span>
        </div>
        <ul className="task-index__task-list-items-container">
          {checked.map((taskId, idx) => {
            const task = tasks.find((task) => task._id === taskId);

            // debugger

            return (
              <React.Fragment key={task._id}>
                <TaskIndexListItem task={task} requirements={task.requirements} />
                {(checked.length > 1 && idx !== checked.length - 1) ? <div className="task-index__task-list-items--spacing"/> : null}
              </React.Fragment>
            )
          })}
        </ul>
        <button type="button"
          className="task-index__task-list-email button"
          onClick={handleEmailClick}>
            <EmailIcon />&nbsp;Email me this list
        </button>
      </div>
    </div>
  )
}
