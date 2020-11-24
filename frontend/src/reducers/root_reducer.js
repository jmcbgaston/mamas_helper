import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'; 
import tasks from './task_reducers'; 
import parent from './assigned_task_reducers'; 
import user from './user_reducer'; 

const RootReducer = combineReducers({
  tasks, 
  parent, 
  session,
  fetchedUser: user,
  errors,
});

export default RootReducer;