import React from 'react';
import TaskUpdateAddRequirement from './task_update_add_requirement'
// import TaskUpdateRequirements from './task_update_requirements';

class TaskUpdate extends React.Component {
    constructor(props) {
      super(props)
      this.state = this.props.task;
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleRequirementChange = this.handleRequirementChange.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault();
      this.props.updateTask(this.state)
        .then(() => this.props.history.goBack())
        .catch(() => alert('Error occurred. Please try again.'))
    }

    handleChange(type) {
      return (e) => {
        this.setState({ [type]: e.currentTarget.value })
      }
    }

    handleRequirementChange(idx) {
      return (e) => {
        const { requirements } = this.state;
        requirements[idx].description = e.currentTarget.value;
        this.setState({ requirements });
      }
    }

    handleRequirementDelete(idx) {
      this.state.requirements.splice(idx, 1)
      this.props.updateTask(this.state)
    }

    componentDidMount(){
        this.props.fetchTask(this.props.match.params.taskId)
        this.setState({ ...this.props.task})
    }

    render() {
      const { task, updateTask, history } = this.props;

      if (!task) {
        return null;
      }

      const { requirements } = this.state;

      return (
        <form className="task-update-form" onSubmit={this.handleSubmit}>
            <h2 className="task-update-form__title">Title:</h2>
            <label className="task-update-form__label">
              <input type="text"
                className="task-update-form__input input-field"
                value={this.state.title}
                onChange={this.handleChange('title')}
                placeholder={task.title} />
            </label>
            {/* <TaskUpdateRequirements /> */}

            <div className="task-update-form__requirements-container">
              <h2 className="task-update-form__requirements-header">Requirements:</h2>
              <ul className="task-update-form__requirements-list">
                {requirements.map((requirement, idx) => {
                  return (
                    <li key={`task-update-form__requirements-list-item-${requirement._id}`}
                      className="input-add-on">
                      <span type="button"
                        className="input-add-on__item
                          input-add-on__item--span input-add-on__item--left">
                        {idx + 1}
                      </span>
                      <input type="text"
                        className="input-add-on__field
                          input-add-on__field--middle input-field"
                        value={requirement.description}
                        onChange={this.handleRequirementChange(idx)}
                        placeholder={task.requirements[idx].description}/>
                      <button
                        type="button"
                        className="input-add-on__item
                        input-add-on__item--right input-add-on__item__minus"
                        onClick={() => this.handleRequirementDelete(idx)}>
                          <i className="fas fa-minus" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <TaskUpdateAddRequirement task={this.state} updateTask={updateTask} />
            <button className="task-update-form__submit button">Update</button>
            <button type="button"
              className="task-update-form__cancel button"
              onClick={() => history.goBack()}>
                Cancel
            </button>
        </form>
      )
    }
}

export default TaskUpdate;
