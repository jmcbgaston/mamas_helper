import React from 'react';
import TaskShowRequirements from './task_show_requirements';
import { Link } from 'react-router-dom';

class TaskShow extends React.Component {
  componentDidMount(){
    const { fetchTask, match: { params } } = this.props;
    fetchTask(params.taskId);
  }

  render() {
    const { task, deleteTask, match: { params } } = this.props;

    if (!task) {
      return null;
    }

    const requirements = task.requirements;

    return (
      <>
        <div className="task-show__container">
          { task ? <h2 className="task-show__title">{task.title}</h2> : null }
          { requirements.length ? <TaskShowRequirements requirements={requirements} /> : null }
        </div>
        <div className="task-show__options">
          <Link to="/startmyday" className="task-show__link">
            <button
              className ="task-show__option button"
              onClick={() => (deleteTask(task._id))}>
                Delete Task
            </button>
          </Link>
          <Link to={`/startmyday/${params.taskId}/edit`} className="task-show__link">
            <button type="button" className="task-show__option button">Edit Task</button>
          </Link>
          <Link to="/startmyday" className="task-show__link">
            <button type="button" className="task-show__option button">Back</button>
          </Link>
        </div>
      </>
    )
  }
};

export default TaskShow;
