import React from 'react'
import AddIcon from '@material-ui/icons/Add';

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
        <form className="task-update__add-requirement" onSubmit={this.handleButton}>
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
              className="input-add-on__item input-plus"
              onClick={this.handleButton}>
                <AddIcon/>
            </button>
          </div>
        </form>
      )
    }
}

export default TaskUpdateAddRequirement;
