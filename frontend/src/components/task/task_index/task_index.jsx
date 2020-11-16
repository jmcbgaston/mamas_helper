import React from "react"
import TaskIndexCreate from "./task_index_create";
import { createEmail } from "../../../util/email_api_util";
import { Link } from "react-router-dom";
import { TaskIndexList } from "./task_index_list";
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TaskInstructionBox from "./task_instruction_box";
import { updateChildUser } from "../../../util/user_api_util"

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleAssigneeDropdown = this.handleAssigneeDropdown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.state = {
      showModal: false,
      checkedTasksIds: {}
    }
    this.taskId = ""
    this.assigneeId = ""
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleAssigneeDropdown() {
    const assignees = this.props.user.household.map((assignee) => {
      return(
        <option 
          value={assignee.handle} 
          id={assignee._id}>
            {assignee.handle}
        </option>
      )
    })

    return(
      <div>
        <select 
          name="assignees" 
          className="assigness"
          onChange={this.handleSelection}>
          <option value="none">---</option>
          {assignees}
        </select>
      </div>
    )
  }

  handleSelection(e) {

    this.taskId = e.currentTarget.closest('li').firstElementChild.id
    let task = this.props.tasks.find(task => task._id === this.taskId)

    if (e.currentTarget.value === 'none') {
      this.props.user.household.forEach(user => {
        let newAT = user.assignedTasks.filter(aTask => aTask !== task)
        user.assignedTasks = newAT
        updateChildUser(user)
      })

      return
    }

    this.assigneeId = e.currentTarget.selectedOptions[0].id
    let assignee = this.props.user.household.find(user => user._id === this.assigneeId)

    assignee.assignedTasks.push(task)

    updateChildUser(assignee)
  }

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

      task.requirements.forEach((requirement) => {
        HTMLString.push(`<li>${requirement.description}</li>`);
      })
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
    const { tasks, createTask, errors, clearErrors } = this.props;
    const { showModal, checkedTasksIds } = this.state;

    //helper method for if a task is selected
    const is_task_selected = () =>
    {
      return !Object.keys(checkedTasksIds).filter((taskId) => checkedTasksIds[taskId]).length
    };
    
    if (this.props.user.household.length === 0 && this.props.user.isLimitedUser === false) { // Regular User
      // debugger

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
                <Link to={`/tasks/${task._id}`}
                  className="task-index__list-item-link">
                  {task.title}
                </Link>
              </li>
            )}
          </ul>
          <TaskIndexCreate tasks={tasks} createTask={createTask} errors={errors} clearErrors={clearErrors}/>
          <TaskInstructionBox/>
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
          {showModal ? <TaskIndexList handleClose={this.handleTaskClick} tasks={this.props.tasks} checkedTasksIds={{...checkedTasksIds}} /> : null}
  
          <p>User ID: {this.props.user.id}</p>
        </>
      );
    } 
    
    if (this.props.user.household.length > 0 && this.props.user.isLimitedUser === false) { // Parent User
      // debugger

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
                <Link to={`/tasks/${task._id}`}
                  className="task-index__list-item-link">
                  {task.title}
                </Link>


                {this.handleAssigneeDropdown()}


              </li>
            )}
          </ul>
          <TaskIndexCreate tasks={tasks} createTask={createTask} errors={errors} clearErrors={clearErrors}/>
          <TaskInstructionBox/>
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
          {showModal ? <TaskIndexList handleClose={this.handleTaskClick} tasks={this.props.tasks} checkedTasksIds={{...checkedTasksIds}} /> : null}
  
          <p>User ID: {this.props.user.id}</p>
        </>
      );
    }

    if (this.props.user.isLimitedUser) { // Child User
      // debugger

      return (
        <>
          <ul className="aTask-index__list">
            {this.props.user.assignedTasks.map((aTask) =>
              <li className="task-index__list-item" key={aTask._id}>
                <input
                  type="checkbox"
                  id={aTask._id}
                  className="task-index__list-item-checkbox"
                  onClick={this.handleCheck}
                  />
                <Link to={`/tasks/${aTask._id}`}
                  className="task-index__list-item-link">
                  {aTask.title}
                </Link>
              </li>
            )}
          </ul>

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
              </li>
            )}
          </ul>
          <TaskIndexCreate tasks={tasks} createTask={createTask} errors={errors} clearErrors={clearErrors}/>
          <TaskInstructionBox/>
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
          {showModal ? <TaskIndexList handleClose={this.handleTaskClick} tasks={this.props.tasks} checkedTasksIds={{...checkedTasksIds}} /> : null}
  
          <p>User ID: {this.props.user.id}</p>
        </>
      );
    } 
    
  }
}

export default TaskIndex;
