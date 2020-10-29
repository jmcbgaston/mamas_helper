import React from 'react';

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
    this.setState({title: event.currentTarget.value});
  }

  handleSubmit(event) {
    const { createTask, user, history } = this.props;
    event.preventDefault();

    createTask({
      title: this.state.title,
      owner_id: user.id
    })
    .then(history.push('/startmyday'))
    // .then()
    .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Create Task"/>
      </form>
    );
  }
}

export default TasksCreate;
