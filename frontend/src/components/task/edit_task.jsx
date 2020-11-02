import React from 'react';
import RequirementsForm from './requirements_form'
import '../../css/task.css'
import '../../css/navbar.css'


class EditTask extends React.Component {
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
        .then( () => this.props.history.push(`/startmyday/${this.props.match.params.taskId}`))
        .catch( () => console.log("errrrorrrrsss"))
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
      
      return (
        <div className="edit-task-outer-container"  className="edit-task-inner-container">
            <form onSubmit={this.handleSubmit}>
                <label><div className="edit-task-label-title">Title:</div>
                    <input className="edit-task-input" type="text" value={this.state.title} onChange={this.handleChange('title')} placeholder="Title*" />
                </label>
                <span className="edit-task-label">Requirements:</span>
                {this.state.requirements.map((requirement, idx) => {
                    return (
                        <label> {this.props.task.requirements[idx].description}
                             <input className="edit-task-input" type="text" value={requirement.description} onChange={this.handleRequirementChange(idx)} placeholder="descriptions*"/>
                        </label>
                    )
                } )}
                <RequirementsForm task={this.state} updateTask={this.props.updateTask}/>
                <button className="edit-task-submit-button">Update</button>
            </form>
        </div>
      )
    }
}


export default EditTask;
