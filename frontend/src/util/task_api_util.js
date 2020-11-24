
import axios from 'axios';

export const getUserTasks = user_id => {
    // debugger
    return axios.get(`/api/tasks/user/${user_id}`)
}

export const getUserAssignedTasks = data => {
    debugger
    return axios.get(`/api/tasks/user/${data.parentId}`, data)
}

export const getUserTask = task_id => {
    return axios.get(`/api/tasks/${task_id}`)
}

export const createTask = data => {
    return axios.post('/api/tasks/new', data)
}

export const updateTask = data => {
    return axios.patch(`/api/tasks/${data._id}`, data)
}

export const deleteTask = task_id => {
    return axios.delete(`/api/tasks/${task_id}`)
}
