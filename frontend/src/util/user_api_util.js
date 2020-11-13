import axios from 'axios';

export const getUser = user_id => {
    return axios.get(`/api/users/${user_id}`)
}

export const updateUser = data => {
    debugger
    return axios.patch(`/api/users/${data._id}`, data)
}