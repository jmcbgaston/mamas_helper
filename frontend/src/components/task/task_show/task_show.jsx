import React from 'react';
import TaskShowRequirements from './task_show_requirements';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Back from '../../back';
import DeleteConfirmation from '../../delete_confirmation';

class TaskShow extends React.Component {
  constructor() {
    super();
    this.handleClickDelete = this.handleClickDelete.bind(this);

    this.state = {
      showDeleteConfirmation: false
    }
  }

  componentDidMount(){
    const { fetchTask, match: { params } } = this.props;
    fetchTask(params.taskId);
  }

  handleClickDelete(e) {
    this.setState({ showDeleteConfirmation: !this.state.showDeleteConfirmation })
  }

  render() {
    const { task, deleteTask, history, match: { params } } = this.props;

    if (!task) {
      return null;
    }

    const requirements = task.requirements;

    return (
      <>
        <div className="task-show__container">
          <h2 className="task-show__title">{task.title}</h2>
          { requirements.length ?
            <TaskShowRequirements requirements={requirements} />
            :
            <p className="task-show__no-requirements">No requirements yet. Click "Edit Task" button to add requirements.</p>
          }
        </div>
        <div className="task-show__options">
          <button
            className ="task-show__option task-show__option--delete button box__no-bottom-border"
            onClick={this.handleClickDelete}>
              <DeleteIcon />&nbsp;Delete Task
          </button>
          <Link to={`/tasks/${params.taskId}/edit`} className="task-show__link">
            <button type="button" className="task-show__option task-show__option--update button">
              <EditIcon />&nbsp;Edit Task
            </button>
          </Link>
          <Back history={history} />
        </div>
        {this.state.showDeleteConfirmation ?
          <DeleteConfirmation
            history={history}
            taskId={task._id}
            handleDelete={deleteTask}
            handleCancel={this.handleClickDelete} />
          :
          null
        }
      </>
    )
  }
};

export default TaskShow;
