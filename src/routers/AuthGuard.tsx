import React, { Component } from 'react';
import AuthContext from 'src/context/auth.context';
import FBAuth from 'src/shared/utils/fb-auth';
import GoogleAuth from 'src/shared/utils/google-auth';
import UserService from 'src/auth/services/user/user.service';
import LoadingContext from 'src/context/loading.context';
enum OAuth {
  None = 0,
  Google = 1,
  FB = 2
}
class AuthGuard extends Component {
  state = {
    authorized: false,
    auth: OAuth.None
  };

  static contextType = LoadingContext;
  context!: React.ContextType<typeof LoadingContext>;

  componentDidMount() {
    this.checkAuth$();
  }

  checkAuth$ = () => {
    return Promise.all([GoogleAuth.checkLoginStatus$(), FBAuth.checkLoginStatus$()]).then(([gLogin, fbLogin]) => {
      let auth = OAuth.None;
      if (this.state.auth === OAuth.None) {
        if (fbLogin !== this.state.authorized) {
          auth = OAuth.FB;
        } else if (gLogin !== this.state.authorized) {
          auth = OAuth.Google;
        }
      }
      if ((auth || this.state.auth) === OAuth.FB) {
        if (fbLogin === this.state.authorized) {
          return;
        } else if (fbLogin) {
          this.context.startLoading();
          FBAuth.queryAuthInfo$()
            .then(data => UserService.getUser$(data.id))
            .then(user => {
              UserService.setUser(user);
              this.setState({
                authorized: fbLogin,
                auth: fbLogin ? OAuth.FB : OAuth.None
              });
              this.context.finishLoading();
            });
        } else {
          this.setState({
            authorized: fbLogin,
            auth: fbLogin ? OAuth.FB : OAuth.None
          });
        }
      } else if ((auth || this.state.auth) === OAuth.Google) {
        if (gLogin === this.state.authorized) {
          return;
        } else if (gLogin) {
          this.context.startLoading();
          UserService.getUser$(GoogleAuth.getUserInfo().id).then(user => {
            UserService.setUser(user);
            this.setState({
              authorized: gLogin,
              auth: gLogin ? OAuth.Google : OAuth.None
            });
            this.context.finishLoading();
          });
        } else {
          this.setState({
            authorized: gLogin,
            auth: gLogin ? OAuth.Google : OAuth.None
          });
        }
      }
    });
  };
  render() {
    return (
      <AuthContext.Provider value={{ authorized: this.state.authorized, checkAuth$: this.checkAuth$ }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthGuard;
