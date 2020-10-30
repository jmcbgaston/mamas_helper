import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import TaskShowContainer from './task/task_show_container'
import TaskIndexContainer from './task/task_index_container'
import EditTaskContainer from './task/edit_task_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import "../css/0reset.css";
import "../css/app.css";
import "../css/form.css";
import "../css/task.css";

const App = () => (
    <div className="app-container">
      <NavBarContainer />
      <Switch>
          <ProtectedRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute exact path ="/startmyday" component={TaskIndexContainer} />
          <ProtectedRoute exact path = "/startmyday/:taskId" component ={TaskShowContainer} />
          <ProtectedRoute exact path = "/startmyday/:taskId/edit" component ={EditTaskContainer} />
      </Switch>
    </div>

);

export default App;
