import { connect } from 'react-redux';
import { fetchTask, updateTask } from '../../../actions/task_actions';
import TaskUpdate from './task_update';

const mapStateToProps = (state, ownProps) => {
    return ({
        task: state.tasks[ownProps.match.params.taskId]
    })
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchTask: (taskId) => dispatch(fetchTask(taskId)),
        updateTask: (task) => dispatch(updateTask(task))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);
