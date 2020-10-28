import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'; 
import tasks from './task_reducers'; 

const RootReducer = combineReducers({
  tasks, 
  session,
  errors
});

export default RootReducer;