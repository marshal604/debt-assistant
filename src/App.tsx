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
import AuthRoute from 'src/routers/AuthRoute';
import Loading from 'src/shared/layout/Loading/Loading';
interface AppState {
  authorized: boolean;
}
class App extends Component<{}, AppState> {
  render() {
    return (
      <HashRouter basename="/">
        <div className="App p-3">
          <Loading>
            <Switch>
              <Route path="/home" exact component={HomePage}></Route>
              <Route path="/login" component={LoginPage} />
              <Route path="/privacy/:lang" component={Privacy} />
              <Route path="/terms/:lang" component={Terms} />
              <AuthRoute path="/group/create" exact component={GroupSetting} />
              <AuthRoute path="/group/edit/:id" component={GroupSetting} />
              <AuthRoute path="/group/:id" component={GroupDetail} />
              <AuthRoute path="/user" component={UserPage} />
              <Redirect to="/home" from="/" />
            </Switch>
          </Loading>
        </div>
      </HashRouter>
    );
  }
}

export default App;
