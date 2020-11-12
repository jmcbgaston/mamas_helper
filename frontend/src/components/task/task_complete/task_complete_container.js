import { connect } from "react-redux";
import TaskComplete from "./task_complete";
import { fetchTasks, createTask, removeTaskErrors } from "../../../actions/task_actions";

const mapStateToProps = (state) => {
    const user = state.session.user
    const tasks = Object.values(state.tasks)
    return({
        user: user,
        tasks: tasks,
        errors: state.errors.task
    })
}

const mapDispatchToProps = (dispatch) => {
  return({
    fetchTasks: (userId) => {
      return dispatch(fetchTasks(userId));
    },
    createTask: (task) => {
      return dispatch(createTask(task))
    },
    clearErrors: () => {
      return dispatch(removeTaskErrors());
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskComplete);