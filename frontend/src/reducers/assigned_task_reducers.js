import { RECEIVE_ASSIGNED_TASKS, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions'

const assignedTaskReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_ASSIGNED_TASKS: 
        //   debugger
          newState = {};
          action.assignedTasks.data.forEach(assignedTask => {
            // debugger
            newState[assignedTask._id] = assignedTask
            // debugger
          })
        //   debugger
          return newState
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

export default assignedTaskReducer;