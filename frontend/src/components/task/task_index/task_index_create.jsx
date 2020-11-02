import React from 'react';
// import MainPopup from '../main_popup';
import Popup from '../popup'; 

class TaskIndexCreate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      requirements: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { showPopup: false };
    this.togglePopup = this.togglePopup.bind(this);
  }

   togglePopup() {
        this.setState({ showPopup: !this.state.showPopup})
    }

  renderErrors() {
    const errors = Object.keys(this.props.errors)

    return(
      <ul className="task-index__create-form-errors">
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
    this.setState({ showPopup: !this.state.showPopup})
  }

  render() {
    return (
      <>
        {this.state.showPopup ? <Popup closePopup={this.togglePopup} /> : null} 

        <form className="input-add-on" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-add-on__field input-add-on__field--left input-field"
            value={this.state.title}
            placeholder="add a new task"
            onChange={this.handleChange}
            onClick={this.props.clearErrors.bind(this)}/>
          <button
            type="submit"
            className="input-add-on__item input-add-on__item--right input-add-on__item--plus"
            onClick={this.handleButton}>
              <i className="fas fa-plus" />
          </button>
        </form>
        {this.renderErrors()}
      </>
    )
  }
}

export default TaskIndexCreate;
