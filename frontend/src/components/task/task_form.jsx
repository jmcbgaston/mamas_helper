import React from 'react';

class TaskForm extends React.Component{
  constructor(props){
    // debugger
    super(props);
    this.state = {
      title: "",
      requirements: []
    //   owner_id: 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
        <label>Title:
          <input type="text" value={this.state.title} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Create Task"/>
        </div>
      </form>
    )
  }
}

export default TaskForm; 
