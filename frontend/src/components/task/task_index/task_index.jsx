import React from "react"
import TaskIndexCreate from "./task_index_create";
import { createEmail } from "../../../util/email_api_util";
import { Link } from "react-router-dom";
import { TaskIndexList } from "./task_index_list";
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TaskInstructionBox from "./task_instruction_box";
import TaskIndexCompleteList from './task_index_complete_list';

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.toggleCompleteModal = this.toggleCompleteModal.bind(this);
    this.state = {
      showModal: false,
      checkedTasksIds: {},
      checkedCompleteIds: {},
      showCompleteModal: false
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleComplete(e) {
    // debugger
      this.props.tasks.find((task) => task._id === e.currentTarget.id).completed = !this.props.tasks.find((task) => task._id === e.currentTarget.id).completed 
      // this.props.tasks.map((task) => {
      //   if(task._id === e.currentTarget.id) {
      //     return !task.completed
      //   }
      // })
      const checkedCompleteIds = { ...this.state.checkedCompleteIds };
      const taskId = e.currentTarget.id;
      checkedCompleteIds[taskId] = e.currentTarget.checked;
      this.setState({ checkedCompleteIds })

  }

  toggleCompleteModal() {
    this.setState({ showCompleteModal: !this.state.showCompleteModal})
    const completedTaskIds = Object.keys(this.state.checkedCompleteIds)
    const lists = document.getElementsByClassName("task-index__list-item-link")
    this.props.tasks.map((task, i) => {
      if(completedTaskIds.includes(task._id)) {
        const lists = document.getElementsByClassName("task-index__list-item")
        lists[i].innerText = ""
        // this.props.deleteTask(task._id)
      }
    })
  };

  handleCheck(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const taskId = e.currentTarget.id;
    checkedTasksIds[taskId] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })
  }

  handleTaskClick(e) {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleInstructionClick(e) {
    this.setState({
      showInstructions: !this.state.showInstructions
    })
  }

  handleEmailClick(e) {
    const HTMLString = [];
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

      HTMLString.push(`
        <li>${task.title}</li>
        <ul>
      `);

      if (task.requirements.length) {
        task.requirements.forEach((requirement) => {
          HTMLString.push(`<li>${requirement.description}</li>`);
        })
      } else {
        HTMLString.push(`(no requirements)`);
      }

      HTMLString.push(`</ul>`);
    })

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
      .finally(() => {
        Array.from(document.getElementsByClassName('task-index__list-item-checkbox'))
                      .forEach((checkbox) => checkbox.checked = false );
        this.setState({
          showModal: false,
          checkedTasksIds: {}
        });
      })
  }

  render() {
    // debugger
    const { tasks, createTask, errors, clearErrors } = this.props;
    const { showModal, showInstructions, checkedTasksIds, checkedCompleteIds, showCompleteModal } = this.state;

    //helper method for if a task is selected
    const is_task_selected = () =>
    {
      return !Object.keys(checkedTasksIds).filter((taskId) => checkedTasksIds[taskId]).length
    };

    return (
      <>
        <Link to="/completion"><button>Completion page</button></Link>
        <div className="task-index__instruction-container">
          <h2 className="task-index__instruction-header">Tasks</h2>
          <button type="button"
            className="task-index__instruction-button button"
            onClick={this.handleInstructionClick}>
              <InfoIcon />&nbsp;Help
          </button>
        </div>
        <ul className="task-index__list">
          {tasks.map((task) =>
            <li className="task-index__list-item" key={task._id}>
              <input
                type="checkbox"
                id={task._id}
                className="task-index__list-item-checkbox"
                onClick={this.handleCheck}
                />
              <Link to={`/tasks/${task._id}`}
                className="task-index__list-item-link">
                {task.title}
              </Link>
              <input 
                type="checkbox"
                id={task._id}
                className=""
                onClick={this.handleComplete}
              />
            </li>
          )}
        </ul>
        <TaskIndexCreate tasks={tasks} createTask={createTask} errors={errors} clearErrors={clearErrors}/>
        <button type="button"
          className="task-index__email-button button box__no-bottom-border"
          onClick={this.handleEmailClick}
          disabled={is_task_selected()}>
            <EmailIcon />&nbsp;Email me today's tasks
        </button>
        <button
          type="button"
          className="task-index__list-button button"
          onClick={this.handleTaskClick}
          disabled={is_task_selected()}>
          <VisibilityIcon />&nbsp;Show my tasks
        </button>
        <button onClick={this.toggleCompleteModal}>Mark as Complete</button>
        {showModal ? <TaskIndexList handleClose={this.handleTaskClick} tasks={this.props.tasks} checkedTasksIds={{...checkedTasksIds}} /> : null}
        {showInstructions ? <TaskInstructionBox handleClose={this.handleInstructionClick} /> : null}
        {showCompleteModal ? <TaskIndexCompleteList handleClose={this.toggleCompleteModal} tasks={this.props.tasks} checkedCompleteIds={{...checkedCompleteIds}} /> : null}
      </>
    );
  }
}

export default TaskIndex;
