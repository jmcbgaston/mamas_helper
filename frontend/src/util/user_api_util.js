import axios from 'axios';

export const getUser = user_id => {
    return axios.get(`/api/users/${user_id}`)
}

// used for updating parent user's household children's assigned tasks
export const updateUser = data => {
    debugger

    if (data.id) {
        return axios.patch(`/api/users/${data.id}`, data)
    } else {
        return axios.patch(`/api/users/${data._id}`, data)
    }
}