import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
    this.state = {
      checked: {}
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  handleChecked(e) {
    const checked = this.state.checked;
    const task_id = e.currentTarget.id;
    this.setState({ [checked[task_id]]: !checked[task_id] });
  }


  render() {

    const taskList = this.props.tasks.map((task) => {
      const checked = this.state.checked[task._id];
      return (
        <li className="start-my-day-list-item" key={task._id}>
          <input
            type="checkbox"
            id={task._id}
            onClick={this.handleChecked}
            checked={checked} />
          <TaskIndexItem task={task} />
        </li>
      );
    });

    return (
      <div className="start-my-day-container">
          {taskList}
          <TaskForm createTask={this.props.createTask} errors={this.props.errors} clearErrors={this.props.clearErrors}/>
      </div>
    );
  }
}

export default TaskIndex;
