import React from 'react'

class TaskUpdateAddRequirement extends React.Component {
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
        this.setState({ description: e.currentTarget.value })
      )
    }

    handleButton(e) {
      e.preventDefault();
      const { task, updateTask } = this.props;

      const newRequirement = {
        description: this.state.description,
        reusable: false
      }

      task.requirements.push(newRequirement);
      this.setState({ description: "" });
      updateTask(task);
    }

    render() {
      return (
        <div className="input-add-on">
          <input
            type="text"
            maxLength="30"
            className="input-add-on__field input-field"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="add a new requirement"
          />
          <button
            type="button"
            className="input-add-on__item input-add-on__item--plus"
            onClick={this.handleButton}>
              <i className="fas fa-plus" />
          </button>
        </div>
      )
    }
}

export default TaskUpdateAddRequirement;
