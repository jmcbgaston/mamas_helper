import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      checked: {}
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  handleChecked(e) {
    e.preventDefault();
    const { checked } = this.state;
    const task_id = e.currentTarget.id;
    debugger

    // if (checked[task_id] === undefined) {
    //   this.setState({ checked[task_id]: true });
    // } else {
    //   this.setState({ checked[id]: !checked[id] });
    // }
    debugger
  }


  render() {
    const taskList = this.props.tasks.map((task) => {
      return (
        <li className="start-my-day-list-item" key={task._id}>
          <input
            type="checkbox"
            id="task_id"
            onChange={this.handleToggle}/>
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
