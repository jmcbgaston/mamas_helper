import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";
import { createEmail } from "../../util/email_api_util";

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
    const { tasks, user } = this.props;
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds)
                      .filter((taskId) => checkedTasksIds[taskId]);


    HTMLString.push(`
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
    `)

    const html = {__html: HTMLString.join('') };
    return <div dangerouslySetInnerHTML={html} />
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
      .finally(() => Array.from(document.getElementsByClassName('task-checkbox'))
                      .forEach((checkbox) => checkbox.checked = false ))
  }

  render() {

    const html = {__html: 'First &middot; Second' };

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
      <ul className="start-my-day-container">
          {taskList}
          <TaskForm createTask={this.props.createTask} errors={this.props.errors} clearErrors={this.props.clearErrors}/>
          <button type="button" onClick={this.handleEmailClick} className="email-tasks-button">Email me today's tasks</button>
          <button type="button" onClick={this.handleTaskClick} className="list-tasks-button">List my tasks and requirements</button>
          {this.state.toggleTaskList ? this.buildTaskList() : null}
      </ul>
    );
  }
}

export default TaskIndex;
