import React from 'react';

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      requirements: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderErrors() {
    const errors = Object.keys(this.props.errors)

    return(
      <ul className="create-task-errors">
        { errors.map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  handleChange(event) {
    return (
      this.setState({title: event.currentTarget.value})
    )
  }

  handleSubmit(e){
    e.preventDefault();
    const task = this.state;
    this.props.createTask(task);
    this.setState({
      title: "",
      requirements: []
    });
  }

  render() {
    return (
      <form className="task-index__create-form" onSubmit={this.handleSubmit}>
        <label className="task-index__create-label">
          <div className="task-index__create-title">Title:&nbsp;</div>
          <input
            type="text"
            className="task-index__create-input input-field"
            value={this.state.title}
            onChange={this.handleChange}
            onClick={this.props.clearErrors.bind(this)}/>
        </label>
        {this.renderErrors()}
        <input type="submit" value="Create Task" className="task-index__create-submit button" />
      </form>
    )
  }
}

export default TaskForm;
