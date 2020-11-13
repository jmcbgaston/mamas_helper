import { connect } from "react-redux"
import TaskIndex from "./task_index"
import { fetchTasks, fetchTask, createTask, removeTaskErrors } from "../../../actions/task_actions";
import { fetchUser } from "../../../actions/user_actions"

const mapStateToProps = (state) => {
    const user = state.session.user
    const tasks = Object.values(state.tasks)
    const fetchedUser = state.fetchedUser

    return({
        user: user,
        fetchedUser: fetchedUser,
        tasks: tasks,
        errors: state.errors.task
    })
}

const mapDispatchToProps = (dispatch) => {
  return({
    fetchTasks: (userId) => {
      return dispatch(fetchTasks(userId));
    },
    fetchTask: (taskId) => {
      return dispatch(fetchTask(taskId));
    },
    fetchUser: (userId) => {
      return dispatch(fetchUser(userId));
    },
    createTask: (task) => {
      return dispatch(createTask(task))
    },
    clearErrors: () => {
      return dispatch(removeTaskErrors());
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex)

