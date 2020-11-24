import { connect } from "react-redux"
import TaskIndex from "./task_index"
import { fetchTasks, fetchAssignedTasks, fetchTask, createTask, removeTaskErrors, deleteTask, updateTask } from "../../../actions/task_actions";
import { fetchUser, updateUser } from "../../../actions/user_actions"

const mapStateToProps = (state) => {
    const user = state.session.user
    // const tasks = Object.values(state.tasks).filter(task => task.owner_id === user.id)
    const tasks = Object.values(state.tasks)
    const fetchedUser = state.fetchedUser

    debugger
    const assignedTasks = Object.values(state.assignedTasks)

    return({
        user: user,
        fetchedUser: fetchedUser,
        tasks,
        assignedTasks,
        errors: state.errors.task
    })
}

const mapDispatchToProps = (dispatch) => {
  return({
    fetchUser: (userId) => dispatch(fetchUser(userId)), 
    updateUser: (user) => dispatch(updateUser(user)),
    fetchTasks: (user) => dispatch(fetchTasks(user)), 
    fetchAssignedTasks: (child_user) => dispatch(fetchAssignedTasks(child_user)), 
    fetchTask: (taskId) => dispatch(fetchTask(taskId)), 
    createTask: (task) => dispatch(createTask(task)), 
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    clearErrors: () => dispatch(removeTaskErrors())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);

