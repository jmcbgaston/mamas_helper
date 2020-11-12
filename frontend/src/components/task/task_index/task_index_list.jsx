import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const TaskIndexListItem = ({task, requirements}) => {
  return (
    <li>
      <p className="task-index__task-list-item-header">{task.title}</p>
      <ul>
        {requirements.length ?
          requirements.map((requirement) => {
            return (
              <li key={requirement._id} className="task-index__task-list-item-requirement">
                <span className="list-item__bullet-point">➼</span>
                {requirement.description}
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

export const TaskIndexList = ({tasks, checkedTasksIds, handleClose}) => {
  const checked = Object.keys(checkedTasksIds)
  .filter((taskId) => checkedTasksIds[taskId]);

  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button className="task-index__task-list-button" onClick={handleClose}>
             <CloseIcon/>
          </button>
          <span className="task-index__task-list-header">Task List</span>
        </div>
        <ul className="task-index__task-list-items-container">
          {checked.map((taskId, idx) => {
            const task = tasks.find((task) => task._id === taskId);
            return (
              <React.Fragment key={task._id}>
                <TaskIndexListItem task={task} requirements={task.requirements} />
                {(checked.length > 1 && idx !== checked.length - 1) ? <div className="task-index__task-list-items--spacing"/> : null}
              </React.Fragment>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
