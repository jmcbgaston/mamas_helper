import {
    RECEIVE_TASK_ERRORS,
    REMOVE_TASK_ERRORS
} from '../actions/task_actions';

const TaskErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_TASK_ERRORS:
            return action.errors.response.data;
        case REMOVE_TASK_ERRORS:
            return [];
        default:
            return state; 
    }
};
  
  export default TaskErrorsReducer;