import React from 'react';
import Popup from '../popup';

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
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
      this.setState({ showPopup: !this.state.showPopup})
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
    const { tasks, createTask } = this.props;
    const formInputStr = e.nativeEvent.srcElement[0].value;
    const duplicate = tasks.find((task) => task.title === formInputStr);
    if(!duplicate && formInputStr.length >= 2) {
      this.togglePopup();
    }
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
        {this.state.showPopup ? <Popup closePopup={this.togglePopup} /> : null}

        <form className={`input-add-on ${this.addErrorsClass()}`} onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-add-on__field input-field"
            value={this.state.title}
            placeholder="add a new task"
            onChange={this.handleChange}
            onClick={this.props.clearErrors.bind(this)}/>
          <button
            type="submit"
            className="input-add-on__item input-add-on__item--plus"
            onClick={this.handleButton}>
              <i className="fas fa-plus" />
          </button>
        </form>
        { this.renderErrors() }
      </>
    )
  }
}

export default TaskIndexCreate;
