
import axios from 'axios';

export const getUserTasks = user_id => {
    debugger
    return axios.get(`/api/tasks/user/${user_id}`)
}

export const getParent = child_user => {
    debugger
    return axios.get(`/api/tasks/user/${child_user.parentId}`, { 
        params: {
            childId: child_user.id, 
        }
    })
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
