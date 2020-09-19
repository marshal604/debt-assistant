import React, { Component } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import AuthContext from 'src/context/auth.context';

class AuthRoute extends Component<RouteProps> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  componentDidMount() {
    this.context.checkAuth$();
  }

  componentDidUpdate() {
    this.context.checkAuth$();
  }

  render() {
    return (
      <React.Fragment>
        {this.context.authorized ? (
          <Route {...this.props} />
        ) : (
          <Redirect to={`/login?redirectUrl=${window.location.toString().split('#')[1]}`} from={this.props.path as string} />
        )}
      </React.Fragment>
    );
  }
}
export default AuthRoute;
