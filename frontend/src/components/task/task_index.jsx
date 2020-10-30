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
    const requirements = {};
    const { tasks, user } = this.props;
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds)
                      .filter((taskId) => checkedTasksIds[taskId]);

    HTMLString.push(`
      <h2>Howdy, ${user.handle}! This is Mama's Helper with your tasks for today.</h2>
      <br>
      <h3>Task List:</h3>
      <ul>
    `);

    checked.forEach((taskId) => {
      const task = tasks.find((requirement) => requirement._id === taskId);

      HTMLString.push(`<li>${task.title}</li>`);
      task.requirements.forEach((requirement) => {
        debugger
        if (!requirements[requirement._id]) {
          requirements[requirement._id] = requirement;
        }
      })
    })

    HTMLString.push(`
      </ul>
      <br>
      <h3>Requirements:</h3>
      <ul>
    `);

    Object.keys(requirements).forEach((requirementId) => {
      const requirement = requirements[requirementId];
      HTMLString.push(`<li>${requirement.description}</li>`);
    });

    HTMLString.push(`
    </ul>
    <br>
    <br>
    - <i>With love, Mama's Helper.</i>
  `);

    const data = {
      // "email": user.email,
      "email": "werner22@ethereal.email",
      "handle": user.handle,
      "html": HTMLString.join('')
    };

    // createEmail(data)
    //   .then((res) => {
    //     alert("Email sent successfully. Check your inbox!");
    //   })
    //   .catch((err) => {
    //     alert("Sorry, email failed to send!");
    //   })
    //   .finally(() => Array.from(document.getElementsByClassName('task-checkbox'))
    //                   .forEach((checkbox) => checkbox.checked = false ))
  }

  render() {

    const taskList = this.props.tasks.map((task) => {
      return (
        <li className="start-my-day-list-item" key={task._id}>
          <input
            type="checkbox"
            id={task._id}
            className="task-checkbox"
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
          <button onClick={this.handleClick}>Email me my daily tasks</button>
      </div>
    );
  }
}

export default TaskIndex;
