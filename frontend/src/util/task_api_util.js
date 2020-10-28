import axios from 'axios';

// get all users tasks based on task.owner_id
export const getUserTasks = owner_id => {
    debugger;
    return axios.get(`/api/tasks/user/${owner_id}`)
}
// connected to tasks.js:9 // NOT WORKING
 
export const getUserTask = task_id => {
    return axios.get(`/api/tasks/${task_id}`)
}
// connected to tasks.js:48 // YES

export const createTask = data => {
    return axios.post('/api/tasks/new', data)
}
// connected to tasks.js:20 // YES

export const updateTask = data => {
    return axios.patch(`/api/tasks/${data._id}`, data)
}
// connected to tasks.js:54 // YES!!!
// update only takes :id, :title

export const deleteTask = task_id => {
    return axios.delete(`/api/tasks/${task_id}`)
}
// connected to tasks.js:74 // NOT WORKING
