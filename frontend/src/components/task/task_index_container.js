import { connect } from "react-redux"
import TaskIndex from "./task_index"
import { fetchTasks, createTask } from "../../actions/task_actions"

const mapStateToProps = (state) => {

    const user = state.session.user
    const tasks = Object.values(state.tasks)
    // const tasks = state.tasks

    debugger;
    
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
    }
  }) 
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex)