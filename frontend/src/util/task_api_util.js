import axios from 'axios';

// get all users tasks based on task.owner_id
export const getUserTasks = owner_id => {
    return axios.get(`/api/tasks/user/${owner_id}`)
}
// connected to tasks.js:9

export const getUserTask = task_id => {
    return axios.get(`/api/tasks/${task_id}`)
}
// connected to tasks.js:48

export const createTask = data => {
    return axios.post('/api/tasks/new', data)
}
// connected to tasks.js:20

export const updateTask = data => {
    return axios.patch(`/api/tasks/${data.id}`, data)
}
// connected to

export const deleteTask = task_id => {
    return axios.delete(`/api/tasks/${task_id}`)
}
// connected to
