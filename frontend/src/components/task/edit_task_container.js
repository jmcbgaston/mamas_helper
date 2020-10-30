import React from 'react';
import { connect } from 'react-redux';
import EditTask from './edit_task';
import { fetchTask, updateTask } from '../../actions/task_actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
