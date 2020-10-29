import * as TaskAPIUtil from '../util/task_api_util';

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const RECEIVE_TASK_ERRORS = "RECEIVE_TASK_ERRORS";
export const REMOVE_TASK_ERRORS = "REMOVE_TASK_ERRORS";

// regular actions
export const receiveTasks = tasks => ({
    type: RECEIVE_TASKS,
    tasks
});

export const receiveTask = task => ({
    type: RECEIVE_TASK,
    task
});

export const removeTask = taskId => ({
    type: REMOVE_TASK,
    taskId
});

export const receiveTaskErrors = errors => ({
    type: RECEIVE_TASK_ERRORS,
    errors
});

export const removeTaskErrors = () => ({
    type: REMOVE_TASK_ERRORS
});

// thunk action creators

export const fetchTasks = owner_id => dispatch => {
    return (
        TaskAPIUtil.getUserTasks(owner_id)
        .then(tasks => dispatch(receiveTasks(tasks)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
    );
};

export const fetchTask = taskId => dispatch => {
    return (
        TaskAPIUtil.getUserTask(taskId)
        .then(task => dispatch(receiveTask(task)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
    );
};

export const createTask = task => dispatch => {
    // debugger 
    return (
        TaskAPIUtil.createTask(task)
        .then(newTask => dispatch(receiveTask(newTask)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
    );
};

export const updateTask = task => dispatch => {
    return (
        TaskAPIUtil.updateTask(task)
        .then(updatedTask => dispatch(receiveTask(updatedTask)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
    );
};

export const deleteTask = taskId => dispatch => {
    return (
        TaskAPIUtil.deleteTask(taskId)
        .then(() => dispatch(removeTask(taskId)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
    );
};
