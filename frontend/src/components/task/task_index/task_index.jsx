import React from "react"
import TaskForm from "./task_index_create";
import { createEmail } from "../../../util/email_api_util";
import { Link } from "react-router-dom";

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.state = {
      toggleTaskList: false,
      checkedTasksIds: {}
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  buildTaskList() {
    const HTMLString = [];
    const reqDescriptions = [];
    const { tasks } = this.props;
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds)
                      .filter((taskId) => checkedTasksIds[taskId]);

    HTMLString.push(`
      <h3 className="task-list-header"
          style="color:#04835b;font-size:20px;">
        Task List:
      </h3>
      <ul className="task-list-menu">
    `);

    checked.forEach((taskId) => {
      const task = tasks.find((requirement) => requirement._id === taskId);

      HTMLString.push(`<li className="task-list-item" style="list-style: inside">${task.title}</li>`);
      task.requirements.forEach((requirement) => {
        if (!reqDescriptions.includes(requirement.description) || !requirement.reusable) {
          reqDescriptions.push(requirement.description);
        }
      })
    })

    HTMLString.push(`
      </ul>
      <br>
      <h3 className="requirements-list-header"
          style="color:#aa3931;font-size:20px">
        Requirements:
      </h3>
      <ul className="requirements-list-menu">
    `);

    reqDescriptions.forEach((description) => {
      HTMLString.push(`<li className="requirements-list-item" style="list-style: inside">${description}</li>`);
    });

    HTMLString.push(`
      </ul>
    `)

    const html = {__html: HTMLString.join('') };
    return <div className="task-list-container" dangerouslySetInnerHTML={html} />
  }

  handleCheck(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const taskId = e.currentTarget.id;
    checkedTasksIds[taskId] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })
  }

  handleTaskClick(e) {
    this.setState({
      toggleTaskList: !this.state.toggleTaskList
    })
  }

  handleEmailClick(e) {
    const HTMLString = [];
    const reqDescriptions = [];
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
        if (!reqDescriptions.includes(requirement.description) || !requirement.reusable) {
          reqDescriptions.push(requirement.description);
        }
      })
    })

    HTMLString.push(`
      </ul>
      <br>
      <h3>Requirements:</h3>
      <ul>
    `);

    reqDescriptions.forEach((description) => {
      HTMLString.push(`<li>${description}</li>`);
    });

    HTMLString.push(`
      </ul>
      <br>
      <br>
      - <i>With love, Mama's Helper.</i>
    `);

    const data = {
      "email": user.email,
      "handle": user.handle,
      "html": HTMLString.join('')
    };

    createEmail(data)
      .then((res) => {
        alert("Email sent successfully. Check your inbox!");
      })
      .catch((err) => {
        alert("Sorry, email failed to send!");
      })
      .finally(() => Array.from(document.getElementsByClassName('task-index__list-item-checkbox'))
                      .forEach((checkbox) => checkbox.checked = false ))
  }

  render() {
    const { tasks, createTask, errors, clearErrors } = this.props;

    return (
      <>
        <ul className="task-index__list">
          {tasks.map((task) =>
            <li className="task-index__list-item" key={task._id}>
              <input
                type="checkbox"
                id={task._id}
                className="task-index__list-item-checkbox"
                onClick={this.handleCheck}
                />
              <Link to={`/startmyday/${task._id}`}
                className="task-index__list-item-link">
                {task.title}
              </Link>
            </li>
          )}
        </ul>
        <TaskForm createTask={createTask} errors={errors} clearErrors={clearErrors}/>
        <button type="button"
          className="task-index__email-button button"
          onClick={this.handleEmailClick}>
            Email me today's tasks
        </button>
        <button
          type="button"
          className="task-index__list-button button"
          onClick={this.handleTaskClick}>
            List my tasks and requirements
        </button>
        {this.state.toggleTaskList ? this.buildTaskList() : null}
      </>
    );
  }
}

export default TaskIndex;
