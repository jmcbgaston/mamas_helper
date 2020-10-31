import React from 'react';
import RequirementsForm from '../requirements_form'
import TaskUpdateRequirements from './task_update_requirements';

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

    componentDidMount(){
        this.props.fetchTask(this.props.match.params.taskId)
        this.setState({ ...this.props.task})
    }

    render() {
      if (!this.props.task) {
        return null;
      }

      const { task, updateTask } = this.props;
      const requirements = task.requirements;

      return (
        <form className="task-update-form" onSubmit={this.handleSubmit}>
            <label className="task-update-form__label">
              <h2 className="task-update-form__title">Title:&nbsp;</h2>
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
                    <li key={`task-update-form__requirements-list-item-${requirement._id}`} className="task-update-form__requirements-list-item">
                      <label className="task-update-form__requirement-label">
                        <h3>{ requirements[idx].description }</h3>
                        <input type="text"
                          className="task-update-form__requirement-input input-field"
                          onChange={ this.handleRequirementChange(idx) }
                          placeholder={requirement.description}/>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
            <RequirementsForm task={this.state} updateTask={this.props.updateTask}/>
            <button className="task-update-form__submit button">Update</button>
        </form>
      )
    }
}

export default TaskUpdate;
