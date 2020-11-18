import { RECEIVE_USER } from '../actions/user_actions'

const userReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch(action.type) {
        case RECEIVE_USER:

        // debugger

            newState[action.user.data._id] = action.user.data;
            return newState;
        default:
            return oldState;
    }
}

export default userReducer