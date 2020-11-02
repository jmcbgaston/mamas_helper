import React from "react"
import { Link } from 'react-router-dom';

const TaskIndexItem = ({ task }) => {
  return (
    <li className="task-index__list-item" key={task._id}>
      <input
        type="checkbox"
        id={task._id}
        className="task-index__list-item-checkbox"
        // onClick={this.handleCheck}
        />
      <Link to={`/startmyday/${task._id}`}
        className="task-index__list-item-link">
        {task.title}
      </Link>
    </li>
  );
}

export default TaskIndexItem;
