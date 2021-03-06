import React from 'react';
import TaskIndexCreateModal from './task_index_create_modal';
import AddIcon from '@material-ui/icons/Add';

class TaskIndexCreate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      requirements: [],
      showPopup: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderErrors() {
    const errors = Object.keys(this.props.errors)

    return(
      <ul className="form-errors">
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
    const { createTask } = this.props;

    createTask(this.state);
    this.setState({
      title: "",
      requirements: []
    });
  }

  addErrorsClass() {
    const { errors } = this.props;
    return Object.keys(errors).length  ? "task-index__create--errors" : '';
  }

  render() {
    return (
      <>
        <form className={`input-add-on ${this.addErrorsClass()}`} onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-add-on__field input-field"
            maxLength="30"
            value={this.state.title}
            placeholder="add a new task"
            onChange={this.handleChange}
            onClick={this.props.clearErrors.bind(this)}/>
          <button
            type="submit"
            className="input-add-on__item input-plus"
            onClick={this.handleButton}>
              <AddIcon/>
          </button>
        </form>
        { this.renderErrors() }
        {this.state.showPopup ? <TaskIndexCreateModal handleClose={this.togglePopup} /> : null}
      </>
    )
  }
}

export default TaskIndexCreate;
