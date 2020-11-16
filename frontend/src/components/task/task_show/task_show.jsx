import React from 'react';
import TaskShowRequirements from './task_show_requirements';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Back from '../../back';

class TaskShow extends React.Component {
  componentDidMount(){
    const { fetchTask, match: { params } } = this.props;
    fetchTask(params.taskId);
  }

  render() {
    const { task, deleteTask, history, match: { params } } = this.props;

    if (!task) {
      return null;
    }


    const requirements = task.requirements;

    if (this.props.userId !== task.owner_id) {
      return (
        <>
          <div className="task-show__container">
            { task ? <h2 className="task-show__title">{task.title}</h2> : null }
            { requirements.length ? <TaskShowRequirements requirements={requirements} /> : null }
          </div>
          <div className="task-show__options">
            <Back history={history} />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="task-show__container">
            { task ? <h2 className="task-show__title">{task.title}</h2> : null }
            { requirements.length ? <TaskShowRequirements requirements={requirements} /> : null }
          </div>
          <div className="task-show__options">
            <Link to="/" className="task-show__link">
              <button
                className ="task-show__option task-show__option--delete button box__no-bottom-border"
                onClick={() => (deleteTask(task._id))}>
                  <DeleteIcon />&nbsp;Delete Task
              </button>
            </Link>
            <Link to={`/tasks/${params.taskId}/edit`} className="task-show__link">
              <button type="button" className="task-show__option task-show__option--update button">
                <EditIcon />&nbsp;Edit Task
              </button>
            </Link>
            <Back history={history} />
          </div>
        </>
      )
    }
  }
};

export default TaskShow;
