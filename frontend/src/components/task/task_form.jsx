import React from 'react';
import RequirementsForm from './requirements_form'

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

  render(){

    // let requirementsList

    // if (this.state.requirements === []) {
    //   requirementsList = []
    // } else {
    //   requirementsList = this.state.requirements.map((requirement, idx) => {
    //     return (
    //       <li key={idx}>
    //         {requirement.description}
    //       </li>
    //     )
    //   })
    // }
    
    // debugger;

    return(
      <form onSubmit={this.handleSubmit}>
        <div  className="task-submit-container">
        <label>Title:&nbsp;
          <input 
            type="text" 
            value={this.state.title} 
            onChange={this.handleChange} 
            onClick={this.props.clearErrors.bind(this)} className="form-input-field"/>
        </label>

        
        {/* <label>Requirements:&nbsp;
          <ul>
            {requirementsList}
          </ul>
          <RequirementsForm task={this.state}/>
        </label> */}


        {this.renderErrors()}
        <input type="submit" value="Create Task" className="form-submit" />
        </div>
      </form>
    )
  }
}

export default TaskForm;
