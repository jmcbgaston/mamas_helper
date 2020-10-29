import { RECEIVE_TASKS, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions'

const taskReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState)

    switch (action.type) {
        case RECEIVE_TASKS:
            return action.tasks.data
        case RECEIVE_TASK:
            newState[action.task.data._id] = action.task.data
            return newState
        case REMOVE_TASK:
            delete newState[action.taskId]
            return newState
        default:
            return oldState;
    }
}

export default taskReducer;