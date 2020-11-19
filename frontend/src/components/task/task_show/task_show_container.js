import { connect } from 'react-redux';
import { fetchTask, updateTask, deleteTask} from '../../../actions/task_actions';
import TaskShow from './task_show';

const mapStateToProps = (state, ownProps) => {
    return({
        task: state.tasks[ownProps.match.params.taskId],
        userId: state.session.user.id
    })
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchTask: (taskId) => dispatch(fetchTask(taskId)),
        updateTask: (task) => dispatch(updateTask(task)),
        deleteTask: (taskId) => dispatch(deleteTask(taskId))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow);
