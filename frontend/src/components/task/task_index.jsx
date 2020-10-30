import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
    this.state = {
      checkedTasksIds: {}
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  handleChecked(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const task_id = e.currentTarget.id;
    checkedTasksIds[task_id] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })
  }

  render() {

    const taskList = this.props.tasks.map((task) => {
      return (
        <li className="start-my-day-list-item" key={task._id}>
          <input
            type="checkbox"
            id={task._id}
            onClick={this.handleChecked}
            />
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
