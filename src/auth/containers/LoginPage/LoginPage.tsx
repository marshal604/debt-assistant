import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';
import { Redirect } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import FBAuth from 'src/shared/utils/fb-auth';
import AuthContext from 'src/context/auth.context';

class LoginPage extends Component {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  onFBLogin = () => {
    FBAuth.login$()
      .then(info => {
        this.context.checkAuth$();
      })
      .catch(() => {
        alert('login failure');
      });
  };

  render() {
    return (
      <Page central={true}>
        {this.context.authorized ? <Redirect to="/user" /> : null}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-xl-6">
            <Card header={<div className="text-center">選擇你要登入的帳號</div>}>
              <div className="d-flex flex-column">
                <button type="button" onClick={this.onFBLogin} className="btn btn-primary d-flex justify-content-center align-items-center">
                  <i className="fab fa-facebook-square h5 m-0"></i>
                  <span className="ml-2">以Facebook帳號登入</span>
                </button>
                <button type="button" className="btn btn-secondary mt-3">
                  登入方式二
                </button>
              </div>
            </Card>
          </div>
        </div>
      </Page>
    );
  }
}

export default LoginPage;
