import { RECEIVE_TASKS, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions'

const recipesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState)
 
    switch (action.type) {
        case RECEIVE_TASKS:
            return action.tasks
        case RECEIVE_TASK:
            debugger;
            newState[action.task.id] = action.task
            return newState
        case REMOVE_TASK:
            delete newState[action.taskId]
            return newState
        default:
            return oldState;
    }
}

export default recipesReducer;