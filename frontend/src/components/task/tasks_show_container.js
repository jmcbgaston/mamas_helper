import { connect  } from 'react-redux'; 
import { fetchTasks } from '../../actions/task_actions';
import TasksShow from './tasks_show'

const mapStateToProps = (state) => {
    return({
        user: state.session.user,
        tasks: state.tasks
    })
}; 

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchTasks: (owner_id) => dispatch(fetchTasks(owner_id))
    })
}; 

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow);