import { connect } from "react-redux"
import TaskIndex from "./task_index"
import { fetchTasks, fetchParent, fetchTask, createTask, removeTaskErrors, deleteTask, updateTask } from "../../../actions/task_actions";
import { fetchUser, updateUser } from "../../../actions/user_actions"

const mapStateToProps = (state) => {
    const user = state.session.user
    const parent = state.parent
    const fetchedUser = state.fetchedUser
    const tasks = Object.values(state.tasks).filter(task => task.owner_id === user.id)
    let assignedTasks = []
    const errors = state.errors.task
    // const tasks = Object.values(state.tasks)
    
    // debugger
    if (state.parent.household && user.isLimitedUser) {
      // debugger
      const child = state.parent.household.find(user => user.id === user.id)
      // debugger
      assignedTasks = child.assignedTasks.filter(task => task.archived === false)
      // debugger
    }

    // debugger

    return({
      user,
      parent, 
      fetchedUser,
      tasks,
      assignedTasks,
      errors
    })
}

const mapDispatchToProps = (dispatch) => {
  return({
    fetchUser: (userId) => dispatch(fetchUser(userId)), 
    updateUser: (user) => dispatch(updateUser(user)),
    fetchTasks: (userId) => dispatch(fetchTasks(userId)), 
    fetchParent: (child_user) => dispatch(fetchParent(child_user)), 
    fetchTask: (taskId) => dispatch(fetchTask(taskId)), 
    createTask: (task) => dispatch(createTask(task)), 
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    clearErrors: () => dispatch(removeTaskErrors())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);

