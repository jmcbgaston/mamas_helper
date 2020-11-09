const TaskIndexListItem = ({task, requirements}) => {
  return (
    <li>
      <p className="task-list-item__header">{task.title}</p>
      <ul>
        {requirements.map((requirement) => {
          return <li className="task-list-item__requirement">{requirement.description}</li>
        })}
      </ul>
    </li>
  )
}

export const TaskIndexList = ({tasks, checkedTasksIds, handleClose}) => {
  const checked = Object.keys(checkedTasksIds)
  .filter((taskId) => checkedTasksIds[taskId]);

  return (
    <div className="modal">
      <div className="modal-main">
        <div className="button-container">
          <button className="modal-header__button" onClick={handleClose}>
            <i class="far fa-window-close fa-3x" />
          </button>
          <span className="modal-header__title">Task List</span>
        </div>
        <ul className="modal-items-container">
          {checked.map((taskId, idx) => {
            const task = tasks.find((requirement) => requirement._id === taskId);
            return (
              <>
                <TaskIndexListItem task={task} requirements={task.requirements} />
                {(checked.length > 1 && idx !== checked.length - 1) ? <div className="modal-items-spacing"/> : null}
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
