import React from 'react';
import '../../css/task.css';

class TasksCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    return (
      this.setState({title: event.currentTarget.value})
    )


  }

  handleSubmit(e) {
    const { createTask, user, history } = this.props;
    e.preventDefault();
    // debugger
    createTask({
      title: this.state.title,
      owner_id: user.id
    })
    // .then(history.push('/startmyday'))
    // .then()
    // .catch(err => console.log(err))
  }

  componentDidMount(){
    this.props.clearErrors(); 
  }

  renderErrors() {
        const { errors } = this.props;
        return Object.values(errors);
    }

  render() {
    debugger 
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" value={this.state.title} onChange={this.handleChange} />
          <div className="create-task-errors">{this.renderErrors()}</div> 
        </label>
        <input type="submit" value="Create Task"/>
      </form>
    );
  }
}

export default TasksCreate;
