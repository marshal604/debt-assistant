import React, { Component } from 'react';
import AuthContext from 'src/context/auth.context';
import FBAuth from 'src/shared/utils/fb-auth';
import GoogleAuth from 'src/shared/utils/google-auth';
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
        }
        this.setState({
          authorized: fbLogin,
          auth: fbLogin ? OAuth.FB : OAuth.None
        });
      } else if ((auth || this.state.auth) === OAuth.Google) {
        if (gLogin === this.state.authorized) {
          return;
        }
        this.setState({
          authorized: gLogin,
          auth: gLogin ? OAuth.Google : OAuth.None
        });
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
