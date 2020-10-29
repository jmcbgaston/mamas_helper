import { connect  } from 'react-redux';
import { createTask, removeTaskErrors } from '../../actions/task_actions';
import TasksCreate from './task_create.jsx'

const mapStateToProps = (state) => {
    return({
        user: state.session.user,
        tasks: state.tasks,
        errors: state.errors.task
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        createTask: (task) => dispatch(createTask(task)),
        clearErrors: () => dispatch(removeTaskErrors())
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksCreate);
