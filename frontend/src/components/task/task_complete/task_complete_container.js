import { connect } from "react-redux";
import TaskComplete from "./task_complete";
import { fetchTasks } from "../../../actions/task_actions";

const mapStateToProps = (state) => {
    return({
        tasks: Object.values(state.tasks),
        user: state.session.user
    })
}

const mapDispatchToProps = (dispatch) => {
  return({
    fetchTasks: (userId) => dispatch(fetchTasks(userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskComplete);