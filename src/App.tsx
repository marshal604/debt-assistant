import React, { Component } from 'react';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import HomePage from 'src/home/containers/HomePage/HomePage';
import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupDetail from 'src/group/containers/GroupDetail/GroupDetail';
import UserPage from 'src/auth/containers/UserPage/UserPage';
import GroupSetting from 'src/group/containers/GroupSetting/GroupSetting';
import Privacy from 'src/shared/doc/Privacy/Privacy';
import Terms from 'src/shared/doc/Terms/Terms';
class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="App p-3">
          <Switch>
            <Route path="/home" exact component={HomePage}></Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/group/create" component={GroupSetting} />
            <Route path="/group/edit/:id" component={GroupSetting} />
            <Route path="/group/:id" component={GroupDetail} />
            <Route path="/privacy/:lang" component={Privacy} />
            <Route path="/terms/:lang" component={Terms} />
            <Route path="/user" component={UserPage} />
            <Redirect to="/home" from="/" />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
