import React, { useContext, FunctionComponent } from 'react';
import Card from 'src/shared/layout/Card/Card';
import { Redirect } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import FBAuth from 'src/shared/utils/fb-auth';
import AuthContext from 'src/context/auth.context';
import LoadingContext from 'src/context/loading.context';
import GoogleAuth from 'src/shared/utils/google-auth';
import UserService from 'src/auth/services/user/user.service';
import './LoginPage.scss';
const LoginPage: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const loadingContext = useContext(LoadingContext);

  const handleLoginError = () => {
    alert('login failure');
    UserService.clearUser();
    loadingContext.finishLoading();
  };

  const onFBLogin = () => {
    loadingContext.startLoading();
    FBAuth.login$()
      .then(info => {
        return Promise.all([info, UserService.addUser$(info)]);
      })
      .then(([info]) => {
        UserService.setUser(info);
        authContext.checkAuth$();
        loadingContext.finishLoading();
      })
      .catch(error => handleLoginError());
  };

  const onGoogleLogin = () => {
    loadingContext.startLoading();
    GoogleAuth.signStatusChange$((isSignIn: boolean) => {
      if (isSignIn) {
        const info = GoogleAuth.getUserInfo();
        UserService.addUser$(info)
          .then(() => {
            UserService.setUser(info);
            authContext.checkAuth$();
            loadingContext.finishLoading();
          })
          .catch(error => handleLoginError());
      } else {
        handleLoginError();
      }
    });
    GoogleAuth.login$().catch(() => handleLoginError());
  };

  return (
    <Page central={true}>
      {authContext.authorized ? <Redirect to="/user" /> : null}
      <div className="LoginPage row justify-content-center">
        <div className="col-12 col-md-8 col-xl-6">
          <Card header={<div className="text-center">選擇你要登入的帳號</div>}>
            <div className="d-flex flex-column align-items-center">
              <button type="button" onClick={onFBLogin} className="btn btn-primary d-flex align-items-center">
                <i className="fab fa-facebook-f h5 m-0"></i>
                <span className="ml-2">以Facebook帳號登入</span>
              </button>
              <button type="button" onClick={onGoogleLogin} className="btn btn-secondary mt-3 d-flex align-items-center">
                <i className="fab fa-google h5 m-0"></i>
                <span className="ml-2">以Google帳號登入</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
