import React from 'react';
import TaskUpdateAddRequirement from './task_update_add_requirement'
import Back from '../../back';
import TaskUpdateDeleteConfirmation from './task_update_delete_confirmation';

class TaskUpdate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        task: this.props.task,
        idx: -1
      }
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleRequirementChange = this.handleRequirementChange.bind(this);
      this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleTitleChange(e) {
      const task = this.state.task;
      task.title = e.currentTarget.value;
      this.setState({ [task]: task })
    }


    handleClickDelete(idx) {
      this.setState({
        showDeleteConfirmation: !this.state.showDeleteConfirmation,
        idx
      })
    }

    handleRequirementChange(idx) {
      return (e) => {
        const { requirements } = this.state.task;
        requirements[idx].description = e.currentTarget.value;
        this.setState({ requirements });
      }
    }

    handleRequirementDelete(idx) {
      this.state.task.requirements.splice(idx, 1);
      this.props.updateTask(this.state.task);
    }

    componentDidMount(){
        this.props.fetchTask(this.props.match.params.taskId)
        this.setState({ ...this.props.task})
    }

    componentWillUnmount(){
      this.props.updateTask(this.state.task);
    }

    render() {
      const { task, updateTask, history } = this.props;

      if (!task) {
        return null;
      }

      const { requirements } = this.state.task;

      return (
        <>
          <p className="task-update-form__message">Changes are saved automatically</p>
          <h2 className="task-update-form__title">Title:</h2>
          <label className="task-update-form__label">
            <input type="text"
              maxLength="30"
              className="task-update-form__input input-field"
              value={this.state.task.title}
              onChange={this.handleTitleChange}
              placeholder={task.title} />
          </label>
          <div className="task-update-form__requirements-container">
            <h2 className="task-update-form__requirements-header">Requirements:</h2>
            <ul className="task-update-form__requirements-list">
              {requirements.map((requirement, idx) => {
                return (
                  <li key={`${idx}`}
                    className="input-add-on box__no-bottom-border">
                    <span type="button"
                      className="input-add-on__item
                        input-add-on__item--span">
                      {idx + 1}
                    </span>
                    <input type="text"
                      maxLength="30"
                      className="input-add-on__field input-field"
                      value={requirement.description}
                      onChange={this.handleRequirementChange(idx)}
                      placeholder={task.requirements[idx].description}/>
                    <button
                      type="button"
                      className="input-add-on__item input-add-on__item--minus"
                      onClick={() => this.handleClickDelete(idx)}>
                        <i className="fas fa-minus" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <TaskUpdateAddRequirement task={this.state.task} updateTask={updateTask} />
          <Back history={history} />
          {this.state.showDeleteConfirmation ?
            <TaskUpdateDeleteConfirmation
              idx={this.state.idx}
              handleDelete={updateTask}
              handleDeleteArg={this.state.task}
              handleCancel={this.handleClickDelete} />
            :
            null
          }
        </>
      )
    }
}

export default TaskUpdate;
