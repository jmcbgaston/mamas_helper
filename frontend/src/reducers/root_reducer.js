import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'; 
import tasks from './task_reducers'; 
import user from './user_reducer'; 

const RootReducer = combineReducers({
  tasks, 
  session,
  fetchedUser: user,
  errors,
});

export default RootReducer;