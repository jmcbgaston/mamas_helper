import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";
import { createEmail } from "../../util/email_api_util";

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      checkedTasksIds: {}
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  handleCheck(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const taskId = e.currentTarget.id;
    checkedTasksIds[taskId] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })
  }

  handleClick(e) {
    const HTMLString = [];
    const requirements = [];
    const { tasks, user } = this.props;
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds)
                      .filter((taskId) => checkedTasksIds[taskId]);

    checked.forEach((taskId) => {
      HTMLString.push('<h3>Task List:</h3>');
      HTMLString.push('<ul>');

      const task = tasks.find((requirement) => requirement._id === taskId);
      HTMLString.push(`<li>${task.title}</li>`);
      task.requirements.forEach((requirement) => {
        if (!(requirements.includes(requirement.description) && requirement.reusable)) {
          requirements.add(requirement);
        }
      })
      HTMLString.push('</ul>');

      HTMLString.push('<h3>Requirements:</h3>');
      HTMLString.push('<ul>');
      requirements.forEach((requirement) => HTMLString.push(`<li>${requirement.description}</li>`))
      HTMLString.push('</ul>');
    })

    const data = {
      "email": user.email,
      "handle": user.handle,
      "html": HTMLString.join('')
    };

    createEmail(data)
      .then((res) => {
        alert("Email sent successfully!");
      })
      .catch((err) => {
        alert("Email failed to send!");
      })
  }

  render() {

    const taskList = this.props.tasks.map((task) => {
      return (
        <li className="start-my-day-list-item" key={task._id}>
          <input
            type="checkbox"
            id={task._id}
            onClick={this.handleCheck}
            />
          <TaskIndexItem task={task} />
        </li>
      );
    });

    return (
      <div className="start-my-day-container">
          {taskList}
          <TaskForm createTask={this.props.createTask} errors={this.props.errors} clearErrors={this.props.clearErrors}/>
          <button onClick={this.handleClick}>Email my daily tasks</button>
      </div>
    );
  }
}

export default TaskIndex;
