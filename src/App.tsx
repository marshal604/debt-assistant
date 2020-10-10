import React, { Component } from 'react';
import { Route, HashRouter, Switch, Redirect, Link } from 'react-router-dom';

import './App.scss';
import HomePage from 'src/home/containers/HomePage/HomePage';
import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupDetail from 'src/group/containers/GroupDetail/GroupDetail';
import GroupDetailSetting from 'src/group/containers/GroupDetailSetting/GroupDetailSetting';
import UserPage from 'src/auth/containers/UserPage/UserPage';
import GroupSetting from 'src/group/containers/GroupSetting/GroupSetting';
import AuthRoute from 'src/routers/AuthRoute';
import FBAuth from 'src/shared/utils/fb-auth';
import Header from 'src/shared/layout/Header/Header';
import GoogleAuth from 'src/shared/utils/google-auth';
import Logo from 'src/assets/logo/footer-logo.jpg';
import AuthContext from 'src/context/auth.context';
import UserService from 'src/auth/services/user/user.service';
import Terms from 'src/shared/claimer/Terms/Terms';
import Privacy from 'src/shared/claimer/Privacy/Privacy';
import GroupTemplate from 'src/group/containers/GroupTemplate/GroupTemplate';
import Firebase from 'src/shared/utils/firebase-register';
import NotificationService from './helper/notification/notification.service';
import MenuContainer from './shared/layout/Menu/Menu';
import MenuContext from './shared/layout/Menu/Menu.context';
import { MenuItem } from './shared/layout/Menu/Menu.model';
import HomePageLogo from 'src/assets/logo/homepage-logo.png';

interface AppState {
  authorized: boolean;
}
class App extends Component<{}, AppState> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;
  list: MenuItem[] = [
    {
      iconCls: 'fas fa-user',
      link: '/user',
      title: '個人資訊',
      divider: true
    },
    {
      iconCls: 'fas fa-users',
      link: '/group/create',
      title: '新增群組',
      divider: true
    },
    {
      iconCls: 'fas fa-user-cog',
      link: '',
      title: '設定',
      divider: true
    }
  ];

  logout = async () => {
    const signInWithFb = await FBAuth.checkLoginStatus$();
    if (signInWithFb) {
      FBAuth.logout$()
        .then(() => Firebase.getToken())
        .then(token => NotificationService.deleteDeviceToken$(token))
        .then(() => {
          UserService.clearUser();
          this.context.checkAuth$();
        });
    }
    const signInWithGoogle = await GoogleAuth.checkLoginStatus$();
    if (signInWithGoogle) {
      GoogleAuth.logout$()
        .then(() => Firebase.getToken())
        .then(token => NotificationService.deleteDeviceToken$(token))
        .then(() => {
          UserService.clearUser();
          this.context.checkAuth$();
        });
    }
  };

  componentDidMount() {
    Firebase.messaging.onMessage(payload => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || `https://marshal604.github.io/debt-assistant/favicon.jpg`
      };
      new Notification(notificationTitle, notificationOptions);
    });
  }

  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <MenuContainer brandUrl={HomePageLogo} list={this.list}>
            <Header
              left={
                this.context.authorized ? (
                  <MenuContext.Consumer>
                    {value => <i title="menu" className="yur-cursor-point fas fa-bars" onClick={() => value.toggle()}></i>}
                  </MenuContext.Consumer>
                ) : (
                  <React.Fragment></React.Fragment>
                )
              }
              center={
                <React.Fragment>
                  <Link className="d-flex align-items-center yur-text-decoration-none" to="/">
                    <div className="Logo">
                      <img src={Logo} alt="spinner" />
                    </div>
                    <div className="ml-2">債管家</div>
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
              <AuthRoute path="/group/edit/:id" exact component={GroupSetting} />
              <AuthRoute path="/group/:id/create" exact component={GroupDetailSetting} />
              <AuthRoute path="/group/:id/batch" exact component={GroupTemplate} />
              <AuthRoute path="/group/:id/edit/:no" exact component={GroupDetailSetting} />
              <AuthRoute path="/group/:id" exact component={GroupDetail} />
              <AuthRoute path="/user" exact component={UserPage} />
              <Redirect to="/home" from="/" />
            </Switch>
          </MenuContainer>
        </div>
      </HashRouter>
    );
  }
}

export default App;
