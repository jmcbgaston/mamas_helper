import React from 'react';
import TaskShowRequirementItems from './task_show_requirement_items';

const TaskShowRequirements = ({ requirements }) => {
  return (
    <ul className="task-show__requirements-list">
      {requirements.map((requirement) =>
        <TaskShowRequirementItems
          key={`task-show__requirements-list-item-${requirement._id}`}
          requirement={requirement} />
      )}
    </ul>
  )
}

export default TaskShowRequirements;
