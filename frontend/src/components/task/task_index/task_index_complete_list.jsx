import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const TaskIndexCompleteList = ({ handleClose, tasks, checkedCompleteIds }) => {
    const checked = Object.keys(checkedCompleteIds)
    .filter((taskId) => checkedCompleteIds[taskId]);
  return (
    <div className="task-index__task-list-container">
      <div className="task-index__task-list">
        <div className="task-index__task-list-button-container">
          <button className="task-index__task-list-button" onClick={handleClose}>
             <CloseIcon/>
          </button>
          <span className="task-index__task-list-header">Completed Task</span>
        </div>
        <ul className="task-index__task-list-items-container">
          {checked.map((taskId) => {
            const task = tasks.find((task) => task._id === taskId);
            // if(task.completed)
              return (
              <li>
                   <p className="task-index__task-list-item-header">{task.title}</p>
                   <span>Task completed on {task.updatedAt}</span>
              </li>
                  
              )
            // }

          })}
        </ul>
      </div>
    </div>
  )
}

export default TaskIndexCompleteList;