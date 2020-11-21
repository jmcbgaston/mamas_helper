import React from "react"
import TaskIndexCreate from "./task_index_create";
import { createEmail } from "../../../util/email_api_util";
import { Link } from "react-router-dom";
import { TaskIndexList } from "./task_index_list";
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red} from '@material-ui/core/colors';

import TaskInstructionBox from "./task_instruction_box";
import { updateChildUser } from "../../../util/user_api_util"
// import TaskIndexCompleteList from './task_index_complete_list';

class TaskIndex extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);

    this.handleAssigneeDropdown = this.handleAssigneeDropdown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.updateChildTasks = this.updateChildTasks.bind(this);
    this.setupLocalStorage = this.setupLocalStorage.bind(this);
    this.handleInstructionClick = this.handleInstructionClick.bind(this);

    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.toggleCompleteModal = this.toggleCompleteModal.bind(this);
    this.state = {
      showModal: false,
      showInstructions: false,
      checkedTasksIds: {},
      checkedCompleteIds: {},
      showCompleteModal: false
    }
    this.taskId = ""
    this.assigneeId = ""
    this.selectedOptionsArr = ""

    this.p11 = this.p11.bind(this)
    this.p21 = this.p21.bind(this)
    this.p22 = this.p22.bind(this)
    this.p31 = this.p31.bind(this)
    this.p32 = this.p32.bind(this)
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.user.id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate() {
    if (!this.props.user.isLimitedUser && this.props.user.household.length > 0) {
      this.setOptions();
    }
  }

  setOptions() {
    // sets dropdown value on render and calls setupLocalStorage to creaate localStorage.selectedOptionsArr
    let select = document.getElementsByTagName('select')
    if (localStorage.selectedOptionsArr) {
      let lsArr = localStorage.selectedOptionsArr.split(',')
      for (let i = 0; i < select.length; i++) {
          if (select[i].id === lsArr[(i*2)]) {
            select[i].selectedIndex = lsArr[(i*2)+1]
          }
      }
    }
    this.setupLocalStorage()
  }

  setupLocalStorage() {
    let oldLocal = localStorage.selectedOptionsArr

    this.selectedOptionsArr = new Array(this.props.tasks.length)
    let selectElements = document.getElementsByTagName('select')
        for (let i = 0; i < this.selectedOptionsArr.length; i++) {
          this.selectedOptionsArr[i] = ([selectElements[i].id, selectElements[i].selectedIndex])
        }
    window.localStorage.selectedOptionsArr = this.selectedOptionsArr

    if (oldLocal && (oldLocal.length > window.localStorage.selectedOptionsArr.length)) {
      this.handleFillAssignedTasks()
      this.updateChildTasks();
    }
  }

  handleAssigneeDropdown() {
    const assignees = this.props.user.household.map((assignee) => {
      return(
        <option
          value={assignee.handle}
          className="options"
          id={assignee._id}>
            {assignee.handle}
        </option>
      )
    })
    return assignees
  }

  handleSelection(e) {
    this.taskId = e.currentTarget.closest('li').firstElementChild.id
    let task = this.props.tasks.find(task => task._id === this.taskId)
        
        if (e.currentTarget.value === 'none') { 
          this.setupLocalStorage();
          this.handleFillAssignedTasks();
          this.updateChildTasks();
          return
        }

    // update assignee assignedTasks
    this.assigneeId = e.currentTarget.selectedOptions[0].id
    let assignee = this.props.user.household.find(user => user._id === this.assigneeId)
    assignee.assignedTasks.push(task)

    this.setupLocalStorage();
    this.handleFillAssignedTasks();
    this.updateChildTasks();
  }

  handleFillAssignedTasks() {
    // fixes any differences between localStorage and children assigned tasks
    let lsOpts = window.localStorage.selectedOptionsArr.split(',')
    for (let i = 0; i < lsOpts.length; i++) {
      if (i % 2 !== 0 && lsOpts[i] !== '0') {
        let task = this.props.tasks.find(task => task._id === lsOpts[i-1])
        let child = this.props.user.household[parseInt(lsOpts[i]-1)]
        if (!child.assignedTasks.includes(task)) {
          child.assignedTasks.push(task)
        }
      }
    }
  }

  updateChildTasks() {
    // updates childrens tasks based on localStorage
    this.props.user.household.forEach(child => {
      updateChildUser(child)
    })
  }
  handleComplete(e) {
      // debugger
      // const checkedCompleteIds = { ...this.state.checkedCompleteIds };
      // const taskId = e.currentTarget.id;
      // checkedCompleteIds[taskId] = e.currentTarget.checked;
      // this.setState({ checkedCompleteIds })

      // const checked = Object.keys(checkedCompleteIds);
      //                 // .filter((taskId) => checkedCompleteIds[taskId]);
      // checked.forEach((taskId) => {
        // const findTask = this.props.tasks.find((task) => task._id === taskId)
        //   findTask.completed = !findTask.completed
        //   this.props.updateTask(findTask)
        // })


      const taskId = e.currentTarget.id;
      const allTasks = this.props.tasks.concat(this.props.user.assignedTasks)
      const findTask = allTasks.find((task) => task._id === taskId)

      findTask.completed = !findTask.completed
      this.props.updateTask(findTask)
  }

  // handleIncompleteClick() {
  //   const checkedCompleteIds = { ...this.state.checkedCompleteIds };
  //   const checked = Object.keys(checkedCompleteIds)
  //                     .filter((taskId) => checkedCompleteIds[taskId]);
  //   checked.forEach((taskId) => {
  //   const findTask = this.props.tasks.find((task) => task._id === taskId)
  //   if (!findTask.completed) {
  //     alert(`${findTask.title} has not been completed`)
  //   } else {
  //     findTask.completed = !findTask.completed
  //     this.props.updateTask(findTask)
  //   }
  //   })
  // }

  // handleCompleteClick() {
  //   const checkedCompleteIds = { ...this.state.checkedCompleteIds };
  //   const checked = Object.keys(checkedCompleteIds)
  //                     .filter((taskId) => checkedCompleteIds[taskId]);
  //   checked.forEach((taskId) => {
  //   const findTask = this.props.tasks.find((task) => task._id === taskId)
  //   if (findTask.completed) {
  //     alert(`${findTask.title} is already completed`)
  //   } else {
  //     findTask.completed = !findTask.completed
  //     this.props.updateTask(findTask)
  //     this.toggleCompleteModal();
  //   }
  //   })


  // };

  toggleCompleteModal() {
    this.setState({ showCompleteModal: !this.state.showCompleteModal})
  }

  handleCheck(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const taskId = e.currentTarget.id;
    checkedTasksIds[taskId] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })

    // const checkedCompleteIds = { ...this.state.checkedCompleteIds };
    // checkedCompleteIds[taskId] = e.currentTarget.checked;
    // this.setState({ checkedCompleteIds })
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
    const { tasks, user } = this.props;
    const taskList = [];
    const allTasks = tasks.concat(user.assignedTasks);
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds)
                      .filter((taskId) => checkedTasksIds[taskId]);

    checked.forEach((taskId) => {
      const task = allTasks.find((task) => task._id === taskId);
      taskList.push(task);
    })

    const data = {
      "tasks": taskList,
      "email": user.email,
      "handle": user.handle,
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

  p11() {
    return(
      <>
      <label>Assigned tasks:</label>
      <ul className="task-index__list">
      {this.props.user.assignedTasks.map((task) =>
      <li 
        className="task-index__list-item" 
        key={task._id}>
        <input
          type="checkbox"
          id={task._id}
          className="task-index__list-item-checkbox"
          onClick={this.handleCheck}/>
        <Link to={`/tasks/${task._id}`}
          className="task-index__list-item-link">
          {task.title}
        </Link>
        <label class="switch">
          <input 
            type="checkbox" 
            id={task._id} 
            onChange={this.handleComplete} 
            defaultChecked={task.completed} />
          <span class="slider round"></span>
        </label>
      </li>
      )}
      </ul>
      <label>Your tasks:</label>
      </>
    )
  }

  p21(task) {
    return(
      <>
        <Link to={`/tasks/${task._id}`}
          className="task-index__list-item-link">
          {task.title}
        </Link>
        <label class="switch">
          <input 
            type="checkbox" 
            id={task._id} 
            onChange={this.handleComplete} 
            defaultChecked={task.completed} />
          <span class="slider round"></span>
        </label>
      </>
    )
  }
  p22(task) {
    return(
      <>
        <Link to={`/tasks/${task._id}`}
          className="task-index__list-item-link">
            {task.title}
        </Link>
        <div>
          <select
            name="assignees"
            id={task._id}
            className="select-options"
            onChange={this.handleSelection}>
              <option
              value="none"
              className="options"
              id="0">
              ---
              </option>
            {this.handleAssigneeDropdown()}
          </select>
        </div>
        {task.completed ? 
        <CheckCircleIcon style={{color: green[500]}}/> : 
        <CheckCircleIcon style={{color: red[500]}}/>}
      </>
    )
  }

  p31(showModal, showInstructions, checkedTasksIds) {
    // debugger

    return(
      <>
      { showModal ? 
        <TaskIndexList 
          handleClose={this.handleTaskClick}
          tasks={this.props.tasks} 
          checkedTasksIds={checkedTasksIds} /> : 
        null }

      { showInstructions ? 
        <TaskInstructionBox 
          handleClose={this.handleInstructionClick} 
          copyId={this.props.user.id}/> : 
        null }
      </>
    )
  }
  p32(showModal, showInstructions, checkedTasksIds) {
    // debugger

    return(
      <>
      { showModal ? 
        <TaskIndexList 
          handleClose={this.handleTaskClick}
          tasks={this.props.tasks.concat(this.props.user.assignedTasks)} 
          checkedTasksIds={checkedTasksIds} /> : 
        null }

      { showInstructions ? 
        <TaskInstructionBox 
          handleClose={this.handleInstructionClick} /> : 
        null }
      </>
    )
  }

  showContent = (e) => {
    const tabContents = document.getElementsByClassName("tab-content");
    
    for(let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    
    return tabContents[e.currentTarget.id].style.display = "block";
  }

  render() {
    const { user, tasks, createTask, errors, clearErrors } = this.props;
    const { showModal, showInstructions, checkedTasksIds, checkedCompleteIds, showCompleteModal } = this.state;

    //helper method for if a task is selected
    const is_task_selected = () =>
    {
      return !Object.keys(checkedTasksIds).filter((taskId) => checkedTasksIds[taskId]).length
    };
    
    return (
      <div class="tab-container">
        <div class="button-container">
            <button onClick={this.showContent} class="tab-button" id="0">Index</button>
            <button onClick={this.showContent} class="tab-button" id="1">Archive</button>
        </div>
        <div class="tab-content">
            <div className="task-index__instruction-container">
              <h2 className="task-index__instruction-header">Tasks</h2>
                <button type="button"
                className="task-index__instruction-button button"
                onClick={this.handleInstructionClick}>
                  <InfoIcon />&nbsp;Help
                </button>
            </div>

            { user.isLimitedUser ? this.p11() : null }

          <ul className="task-index__list">
            {tasks.map((task) =>
            <li className="task-index__list-item" key={task._id}>
              <input
              type="checkbox"
              id={task._id}
              className="task-index__list-item-checkbox"
              onClick={this.handleCheck}
              />

            { user.household.length === 0 ? 
            this.p21(task) : 
            this.p22(task) }
            
            </li>
            )}
          </ul>

          <TaskIndexCreate 
            tasks={tasks} 
            createTask={createTask} 
            errors={errors} 
            clearErrors={clearErrors}/>

          <button 
            type="button"
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

          <button 
            onClick={this.handleArchiveClick}
            type="button"
            className="task-index__list-button button">
            Archive
          </button>
        
          { !user.isLimitedUser ? 
            this.p31(showModal, showInstructions, checkedTasksIds) : 
            this.p32(showModal, showInstructions, checkedTasksIds) }
        </div>

        <div class="tab-content">
          <span>I am Are-Kaive</span>
          {tasks.map((task) => {
            if(task.archived) {
              return(
                <h1>{task.title}</h1>
                )
            }
          })}
        </div>

      </div>
    )
  }
}

export default TaskIndex;
