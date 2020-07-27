import React, { Component } from 'react';
import AuthContext from 'src/context/auth.context';
import FBAuth from 'src/shared/utils/fb-auth';
class AuthGuard extends Component {
  state = {
    authorized: false
  };

  componentDidMount() {
    this.checkAuth$();
  }

  checkAuth$ = () => {
    return FBAuth.checkLoginStatus$().then(login => {
      if (login === this.state.authorized) {
        return;
      }
      this.setState({
        authorized: login
      });
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
