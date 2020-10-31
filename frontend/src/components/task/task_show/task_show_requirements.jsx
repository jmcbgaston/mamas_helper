import React from 'react';
import TaskShowRequirementItems from './task_show_requirement_items';

const TaskShowRequirements = ({ requirements }) => {
  return (
    <ul className="requirements-list">
      {requirements.map((requirement) => <TaskShowRequirementItems requirement={requirement} />)}
    </ul>
  )
}

export default TaskShowRequirements;
