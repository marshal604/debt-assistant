import React, { Component } from 'react';
import { Route, HashRouter, Switch, Redirect, Link } from 'react-router-dom';

import './App.scss';
import HomePage from 'src/home/containers/HomePage/HomePage';
import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupDetail from 'src/group/containers/GroupDetail/GroupDetail';
import GroupDetailSetting from 'src/group/containers/GroupDetailSetting/GroupDetailSetting';
import UserPage from 'src/auth/containers/UserPage/UserPage';
import GroupSetting from 'src/group/containers/GroupSetting/GroupSetting';
import Privacy from 'src/shared/doc/Privacy/Privacy';
import Terms from 'src/shared/doc/Terms/Terms';
import AuthRoute from 'src/routers/AuthRoute';
import FBAuth from 'src/shared/utils/fb-auth';
import Header from 'src/shared/layout/Header/Header';
import GoogleAuth from 'src/shared/utils/google-auth';
import Logo from 'src/assets/logo/footer-logo.jpg';
import AuthContext from 'src/context/auth.context';
import UserService from 'src/auth/services/user/user.service';
interface AppState {
  authorized: boolean;
}
class App extends Component<{}, AppState> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  logout = async () => {
    const signInWithFb = await FBAuth.checkLoginStatus$();
    if (signInWithFb) {
      FBAuth.logout$().then(() => {
        UserService.clearUser();
        this.context.checkAuth$();
      });
    }
    const signInWithGoogle = await GoogleAuth.checkLoginStatus$();
    if (signInWithGoogle) {
      GoogleAuth.logout$().then(() => {
        UserService.clearUser();
        this.context.checkAuth$();
      });
    }
  };

  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <Header
            left={
              <React.Fragment>
                <Link to="/">
                  <div className="Logo">
                    <img src={Logo} alt="spinner" />
                  </div>
                </Link>
              </React.Fragment>
            }
            right={
              <React.Fragment>
                {this.context.authorized ? (
                  <i title="logout" className="yur-cursor-point fas fa-sign-out-alt" onClick={this.logout}></i>
                ) : null}
              </React.Fragment>
            }
          />
          <Switch>
            <Route path="/home" exact component={HomePage}></Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/privacy/:lang" component={Privacy} />
            <Route path="/terms/:lang" component={Terms} />
            <AuthRoute path="/group/create" exact component={GroupSetting} />
            <AuthRoute path="/group/edit/:id" component={GroupSetting} />
            <AuthRoute path="/group/:id/create" component={GroupDetailSetting} />
            <AuthRoute path="/group/:id/edit/:no" component={GroupDetailSetting} />
            <AuthRoute path="/group/:id" component={GroupDetail} />
            <AuthRoute path="/user" component={UserPage} />
            <Redirect to="/home" from="/" />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
