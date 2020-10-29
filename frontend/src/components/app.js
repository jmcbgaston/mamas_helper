import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import TasksShowContainer from './task/tasks_show_container'
import TasksCreateContainer from './task/tasks_create_container'

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import "../css/0reset.css";
import "../css/app.css";

const App = () => (
    <div className="app-container">
      <NavBarContainer />
      <Switch>
          <ProtectedRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute exact path ="/startmyday" component={TasksShowContainer} />
          <ProtectedRoute exact path ="/tasks/new" component={TasksCreateContainer} />
      </Switch>
    </div>

);

export default App;
