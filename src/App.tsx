import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import './App.scss';
import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupDetail from 'src/group/containers/GroupDetail/GroupDetail';
import UserPage from 'src/auth/containers/UserPage/UserPage';
import GroupSetting from 'src/group/containers/GroupSetting/GroupSetting';
import Privacy from 'src/shared/doc/Privacy/Privacy';
import Terms from 'src/shared/doc/Terms/Terms';
import HomePage from 'src/home/containers/HomePage/HomePage';
function App() {
  return (
    <HashRouter basename="/">
      <div className="App p-3">
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" component={LoginPage} />
        <Switch>
          <Route path="/group/create" component={GroupSetting} />
          <Route path="/group/edit/:id" component={GroupSetting} />
          <Route path="/group/:id" component={GroupDetail} />
          <Route path="/privacy/:lang" component={Privacy} />
          <Route path="/terms/:lang" component={Terms} />
        </Switch>
        <Route path="/user" component={UserPage} />
      </div>
    </HashRouter>
  );
}

export default App;
