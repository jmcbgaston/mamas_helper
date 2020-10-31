import React from 'react';
import RequirementsShow from '../requirement_show/requirements_show';
// import RequirementShowItem from '../requirement_show/requirement_show_item';
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
          { requirements.length ? <RequirementsShow requirements={requirements} /> : null }
        </div>

        <Link to="/startmyday">
          <button
            className = "task-delete button"
            onClick={ () => (deleteTask(task._id))}>
              Delete Task
          </button>
        </Link>
        <Link to={`/startmyday/${params.taskId}/edit`}>
          <button type='button' className='task-edit button'>Edit Task</button>
        </Link>
        <Link to={"/startmyday"}>
          <button type='button' className='task-back button'>Back</button>
        </Link>
      </>
    )
  }
};

export default TaskShow;
