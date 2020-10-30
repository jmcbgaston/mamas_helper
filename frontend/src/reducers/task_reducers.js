import { RECEIVE_TASKS, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions'

const taskReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_TASKS:
          action.tasks.data.forEach(task => newState[task._id] = task);
          return newState;
        case RECEIVE_TASK:
          newState[action.task.data._id] = action.task.data;
          return newState;
        case REMOVE_TASK:
          delete newState[action.taskId];
          return newState;
        default:
          return oldState;
    }
}

export default taskReducer;