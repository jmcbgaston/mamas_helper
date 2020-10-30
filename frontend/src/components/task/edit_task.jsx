import React from 'react';
import RequirementsForm from './requirements_form'

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
        .then( () => this.props.history.push('/startmyday'))
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
        <div>
            EDIT ME!
            <form onSubmit={this.handleSubmit}>
                <label>Title:
                    <input type="text" value={this.state.title} onChange={this.handleChange('title')} />
                </label>
                <p>Requirements:</p>
                {this.state.requirements.map((requirement, idx) => {
                    return (
                        <label> {this.props.task.requirements[idx].description}
                            <input type="text" value={requirement.description} onChange={this.handleRequirementChange(idx)} />
                        </label>
                    )
                } )}

                <RequirementsForm task={this.state} updateTask={this.props.updateTask}/>

                <button>Submit</button>
            </form>
        </div>
      )
    }
};

export default EditTask;
