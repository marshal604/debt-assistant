import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';

import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupDetail from 'src/group/containers/GroupDetail/GroupDetail';
import UserPage from 'src/auth/containers/UserPage/UserPage';
import GroupSetting from './group/containers/GroupSetting/GroupSetting';

function App() {
  return (
    <BrowserRouter>
      <div className="App p-3">
        <Route path="/login" component={LoginPage} />
        <Switch>
          <Route path="/group/create" component={GroupSetting} />
          <Route path="/group/edit/:id" component={GroupSetting} />
          <Route path="/group/:id" component={GroupDetail} />
        </Switch>
        <Route path="/user" component={UserPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
