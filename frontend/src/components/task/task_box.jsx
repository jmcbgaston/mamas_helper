import React from 'react';
import RequirementBox from './requirement_box';

class TaskBox extends React.Component {
  render() {
    const { task } = this.props;

    return (
      <div className="task-box-container">
        <p className="task-title">{task.title}</p>
        <ul className="task-requirements-list">
          {task.requirements.map(requirement =>
            <RequirementBox key={requirement._id}
                            description={requirement.description}
                            reusable={requirement.reusable}/>
          )}
        </ul>
      </div>
    )
  }
}

export default TaskBox;
