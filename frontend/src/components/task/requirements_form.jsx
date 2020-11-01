import React from 'react'

class RequirementsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          description: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleChange(e) {
        return (
          this.setState({description: e.currentTarget.value})
        )
    }

    handleButton(e) {
        e.preventDefault();
        let newRequirement = { description: this.state.description, reusable: false }
        this.props.task.requirements.push(newRequirement);
        this.setState({
            description: ""
        });
        this.props.updateTask(this.props.task)
    }

    render() {
      return (
        <div className="">
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="add a new requirement"
          />
          <button
            type="button"
            onClick={this.handleButton}>
              <i class="fas fa-plus fa-2x" />
          </button>
        </div>
      )
    }
}

export default RequirementsForm
