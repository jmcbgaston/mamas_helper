import { connect  } from 'react-redux';
import { createTask } from '../../actions/task_actions';
import TasksCreate from './task_create.jsx'

const mapStateToProps = (state) => {
    return({
        user: state.session.user
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        createTask: (task) => dispatch(createTask(task))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksCreate);
