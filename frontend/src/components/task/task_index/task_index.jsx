import React from "react"
import TaskIndexCreate from "./task_index_create";
import { createEmail } from "../../../util/email_api_util";
import { Link } from "react-router-dom";
import { TaskIndexList } from "./task_index_list";
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ArchiveIcon from '@material-ui/icons/Archive';
import { green, red} from '@material-ui/core/colors';
import TaskInstructionBox from "./task_instruction_box";

class TaskIndex extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);

    this.handleAssigneeDropdown = this.handleAssigneeDropdown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setupLocalStorage = this.setupLocalStorage.bind(this);
    this.handleInstructionClick = this.handleInstructionClick.bind(this);

    this.handleArchiveClick = this.handleArchiveClick.bind(this)
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.toggleCompleteModal = this.toggleCompleteModal.bind(this);
    this.state = {
      showModal: false,
      showInstructions: false,
      showCompleteModal: false,
      checkedTasksIds: {}
    }
    this.taskId = ""
    this.assigneeId = ""
    this.selectedOptionsArr = ""

    this.p11 = this.p11.bind(this)
    this.p21 = this.p21.bind(this)
    this.p22 = this.p22.bind(this)
    this.p31 = this.p31.bind(this)
    this.p32 = this.p32.bind(this)

    this.handleArchiveClick = this.handleArchiveClick.bind(this)

    window.showModal = this.state.showModal;
  }

  componentDidMount() {

    if (this.props.user.household.length > 0) {
      this.props.user.household.forEach(child => {
        child.assignedTasks = []
      })
    }

    this.props.fetchTasks(this.props.user.id)
    .then(() => {
      if (this.props.user.isLimitedUser) {
        this.props.fetchParent(this.props.user)
      }
    });

  }

  componentWillUnmount() {
    if (this.props.user.household.length > 0) {
      this.props.updateUser(this.props.user)
    }

    // if (this.props.user.isLimitedUser) {
    //   this.props.parent.household.find(child => {
    //     if (child._id === this.props.user.id) {
    //       child.assignedTasks = this.props.assignedTasks
    //     }
    //   })

    //   let newParent = this.props.parent
    //   this.props.updateUser(newParent)
    // }

    this.props.clearErrors();
  }

  componentDidUpdate() {
    if (!this.props.user.isLimitedUser && this.props.user.household.length > 0) {
      this.setOptions();
    }

    this.updateDisableOnButton()
  }

  updateDisableOnButton() {
    let checks = document.getElementsByClassName('task-index__list-item-checkbox')

    let boolean = false

    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        boolean = true
        break
      }
    }

    let buttons = document.getElementsByClassName('task-index__list-button button')

    if (!boolean) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
      }
    } else {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false
      }
    }


    //reverse of above logic - disable archive button if any of the checked tasks are assigned
    let archive_boolean_reverse = true;
    for (let i = 0; i < checks.length; i++) {
      let assignedTask = this.props.assignedTasks.find((task) => task._id === checks[i].id);
      if (assignedTask && checks[i].checked) {
        archive_boolean_reverse = false;
        break;
      }
    }

    let archive_button = document.getElementById("archive-button");
    if(!archive_boolean_reverse)
    {
      archive_button.disabled = true;
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
    const tasks = this.props.tasks.filter(task => task.archived === false)

    this.selectedOptionsArr = new Array(tasks.length)
    let selectElements = document.getElementsByTagName('select')

    for (let i = 0; i < this.selectedOptionsArr.length; i++) {
      this.selectedOptionsArr[i] = ([selectElements[i].id, selectElements[i].selectedIndex])
    }

    window.localStorage.selectedOptionsArr = this.selectedOptionsArr

    if (oldLocal && (oldLocal.length >= window.localStorage.selectedOptionsArr.length)) {
      this.handleFillAssignedTasks()
    }
  }

  handleAssigneeDropdown() {
    const assignees = this.props.user.household.map((assignee, idx) => {
      return(
        <option
          key={idx}
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
          task.completed = false
          this.props.updateTask(task);
          this.setupLocalStorage();
          this.handleFillAssignedTasks();
          return
        }

    this.setupLocalStorage();
    this.handleFillAssignedTasks();
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

      } else if (i % 2 !== 0 && lsOpts[i] === '0') {
        let task = this.props.tasks.find(task => task._id === lsOpts[i-1])
        let child = this.props.user.household[parseInt(lsOpts[i])]
        let newAssignedTasks = child.assignedTasks.filter(fTask => fTask !== task)

        child.assignedTasks = newAssignedTasks

      } else {

      }
    }
  }

  handleComplete(e) {
      const taskId = e.currentTarget.id;

      let tasks = this.props.tasks
      let aTasks = this.props.assignedTasks

      const allTasks = tasks.concat(aTasks)
      const findTask = allTasks.find((task) => task._id === taskId)

      findTask.completed = !findTask.completed
      this.props.updateTask(findTask)
      .then(() => {
        if (this.props.user.isLimitedUser) {
          this.props.parent.household.find(child => {
            if (child._id === this.props.user.id) {
              child.assignedTasks = this.props.assignedTasks
            }
          })

          let newParent = this.props.parent
          this.props.updateUser(newParent)
        }
      })

  }

  handleArchiveClick() {
    const archiveButton = document.getElementById("archive-button");

    if (archiveButton.disabled) {
      return;
    }


    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds).filter((archiveId) => checkedTasksIds[archiveId])


    checked.forEach((archiveId) => {
      const findTask = this.props.tasks.find((task) => task._id === archiveId)
      if (findTask && !findTask.archived) {
        findTask.archived = true
        findTask.completed = false;
        this.props.updateTask(findTask)
      } else {
        findTask.archived = false
        this.props.updateTask(findTask)
      }
    })
    this.setState({checkedTasksIds: {}})
  };

  toggleCompleteModal() {
    this.setState({ showCompleteModal: !this.state.showCompleteModal})
  }

  handleCheck(e) {
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const taskId = e.currentTarget.id;
    checkedTasksIds[taskId] = e.currentTarget.checked;
    this.setState({ checkedTasksIds })
  }


  handleTaskClick(e) {
    let checkedTasksIds_ = {};
    Array.from(document.querySelectorAll('.task-index__list-item-checkbox'))
    .forEach((checkbox) => {if(checkbox.checked) {checkedTasksIds_[checkbox.id] = true;}});
    if (Object.keys(checkedTasksIds_).length) {
      this.setState({
        showModal: true,
        checkedTasksIds: checkedTasksIds_
      })
    } else {
      this.setState({
        showModal: false,
        checkedTasksIds: {},
      })
    }

  }

  handleInstructionClick(e) {
    this.setState({
      showInstructions: !this.state.showInstructions
    })
  }

  handleEmailClick(e) {
    const { tasks, assignedTasks, user } = this.props;
    const taskList = [];
    const allTasks = tasks.concat(assignedTasks);
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
  }

  handleClear() {
    const { tasks, assignedTasks, user, updateTask } = this.props;
    const allTasks = tasks.concat(assignedTasks);
    const checkedTasksIds = { ...this.state.checkedTasksIds };
    const checked = Object.keys(checkedTasksIds).filter((taskId) => checkedTasksIds[taskId]);

    // uncheck all
    Array.from(document.querySelectorAll('.task-index__list-item-checkbox'))
      .forEach((checkbox) => checkbox.checked = false );

    checked.forEach((taskId) => {
      const task = allTasks.find((task) => task._id === taskId);

      // set checked to incomplete
      task.completed = false;
      updateTask(task)
      .then(() => {
        if (this.props.user.isLimitedUser) {
          this.props.parent.household.find(child => {
            if (child._id === this.props.user.id) {
              child.assignedTasks = this.props.assignedTasks
            }
          })

          let newParent = this.props.parent
          this.props.updateUser(newParent)
        }
      })



      // set assigned status to none
      let selectElements = Array.from(document.getElementsByTagName('select'));
      selectElements.forEach((selectElement) => {
        if (selectElement.id === taskId) {
          selectElement.value = 'none';
        }
      })

      if (user.household.length !== 0) {
        this.setupLocalStorage();
        this.handleFillAssignedTasks();
        // this.updateChildTasks();
      } else {
        let switches = document.getElementsByClassName('switch')
        for (let i = 0; i < switches.length; i++) {
          if(checkedTasksIds[switches[i].firstElementChild.id])
          {
            switches[i].firstElementChild.checked = false
          }
        }
      }

      // reset checked status in state
      this.setState({
        checkedTasksIds: {}
      });
    })

  }

  p11() {
    return(
      <div>
        <div className="task-index__list-headers">
          <div className="task-index__list-selection-header">Select</div>
          <div className="task-index__list-tasks-header">Assigned:</div>
          <div className="task-index__list-completion-header">Completed?</div>
        </div>
        <ul className="task-index__list">
        {this.props.assignedTasks.map((task) =>
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
          <label className="switch">
            <input
              type="checkbox"
              id={task._id}
              onChange={this.handleComplete}
              defaultChecked={task.completed} />
            <span className="slider round"></span>
          </label>
        </li>
        )}
        </ul>
      </div>
    )
  }

  p21(task) {
    return(
      <>
        <label className="switch">
          <input
            type="checkbox"
            id={task._id}
            onChange={this.handleComplete}
            defaultChecked={task.completed} />
          <span className="slider round"></span>
        </label>
      </>
    )
  }
  p22(task) {
    return(
      <>
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

  p31(showModal, showInstructions, checkedTasksIds, handleEmailClick) {

    return(
      <>
      { showModal ?
        <TaskIndexList
          handleClose={this.handleTaskClick}
          tasks={this.props.tasks}
          handleEmailClick={handleEmailClick}
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
  p32(showModal, showInstructions, checkedTasksIds, handleEmailClick) {

    return(
      <>
      { showModal ?
        <TaskIndexList
          handleClose={this.handleTaskClick}
          tasks={this.props.tasks.concat(this.props.assignedTasks)}
          handleEmailClick={handleEmailClick}
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

    Array.from(document.querySelectorAll('.task-index__list-item-checkbox'))
        .forEach((checkbox) => checkbox.checked = false );
    this.setState({
      checkedTasksIds: {}
    });

    tabContents[e.currentTarget.id].style.display = "block";

    // change tab color
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((tabButton, i) => {
      tabButtons[i].style.zIndex = 0;
      tabButtons[i].style.backgroundColor = '#F3F3F3';
    })

    tabButtons[e.currentTarget.id].style.zIndex = 99;
    tabButtons[e.currentTarget.id].style.backgroundColor = '#DBDBD6';
  }

  render() {
    const { user, createTask, errors, clearErrors } = this.props;
    const { showModal, showInstructions, checkedTasksIds} = this.state;

    const tasks = this.props.tasks.filter(task => task.archived !== true)
    const archivedTasks = this.props.tasks.filter(task => task.archived === true)

    const root = document.getElementById('root');
    root.style.backgroundImage = 'url(./backgrounds/index.jpg)'

    const highlightTask = (task) => {
      return (Date.now() - new Date(task.createdAt) < 40000) ?
        ' task-index__list-item--highlight' : ''
    }

    return (
      <div className="tab-container">

        <div className="button-container">
          <button onClick={this.showContent} className="tab-button" id="0" style={{zIndex: "99", backgroundColor:"#DBDBD6"}}>Index</button>
          <button onClick={this.showContent} className="tab-button" id="1" style={{zIndex: "0"}}>Archive</button>
        </div>

        <div className="tab-content">

          <div className="task-index__instruction-container">
            <h2 className="task-index__instruction-header">Tasks</h2>
              <button type="button"
              className="task-index__instruction-button button"
              onClick={this.handleInstructionClick}>
                <InfoIcon />
              </button>
          </div>

          <br/>

          { user.isLimitedUser ? this.p11() : null }

          { user.household.length === 0 ?
            <div className="task-index__list-headers">
              <div className="task-index__list-selection-header">Select</div>
              <div className="task-index__list-tasks-header">Personal:</div>
              <div className="task-index__list-completion-header">Complete?</div>
            </div>
            :
            <div className="task-index__list-headers">
              <div className="task-index__list-selection-header">Select</div>
              <div className="task-index__list-tasks-header">Delegated:</div>
              <div className="task-index__list-completion-header">Complete?</div>
            </div>
          }

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
                  className={`task-index__list-item-link${highlightTask(task)}`}>
                    {task.title}
                </Link>

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

          <div className="task-index__buttons-container">
            <button
                type="button"
                className="task-index__list-button button"
                onClick={this.handleTaskClick}
                >
                <VisibilityIcon />
                <div className="button-label">View selected</div>
            </button>
            <button
              type="button"
              id="archive-button"
              className="task-index__list-button task-index__list-button--not-first button"
              onClick={this.handleArchiveClick}>
              <ArchiveIcon />
              <div className="button-label">Archive selected</div>
            </button>
            <button
              type="button"
              className="task-index__list-button task-index__list-button--not-first button"
              onClick={this.handleClear}>
              <ClearAllIcon />
              <div className="button-label">Clear selected</div>
            </button>
          </div>

          { !user.isLimitedUser ?
            this.p31(showModal, showInstructions, checkedTasksIds, this.handleEmailClick) :
            this.p32(showModal, showInstructions, checkedTasksIds, this.handleEmailClick) }

        </div>

        <div
          className="tab-content"
          style={{display: "none"}}>


          <div className="task-index__instruction-container">
            <h2 className="task-index__instruction-header">Archive</h2>
          </div>

          <br/>

          <ul className="task-index__list">
            {archivedTasks.map((task) =>
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

          <div className="task-index__buttons-container-unarchive">
            <button
              type="button"
              className="task-index__list-button task-index__list-button--not-first button"
              onClick={this.handleArchiveClick}>
              <ArchiveIcon />
              <div className="button-label">Unarchive selected</div>
            </button>
          </div>

        </div>

      </div>
    )
  }
}

export default TaskIndex;
