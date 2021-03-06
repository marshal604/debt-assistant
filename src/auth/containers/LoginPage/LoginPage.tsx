import React, { useContext, FunctionComponent } from 'react';
import Card from 'src/shared/layout/Card/Card';
import { Redirect, RouteProps } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import FBAuth from 'src/shared/utils/fb-auth';
import AuthContext from 'src/context/auth.context';
import GoogleAuth from 'src/shared/utils/google-auth';
import UserService from 'src/auth/services/user/user.service';
import './LoginPage.scss';
import Firebase from 'src/shared/utils/firebase-register';
import NotificationService from 'src/helper/notification/notification.service';
import HttpClient from 'src/helper/httpClient/httpClient';
const LoginPage: FunctionComponent = (props: RouteProps) => {
  const authContext = useContext(AuthContext);

  const handleLoginError = () => {
    alert('login failure');
    UserService.clearUser();
  };

  const onFBLogin = () => {
    HttpClient.middle(
      FBAuth.login$()
        .then(() => authContext.checkAuth$())
        .then(() => {
          if (Firebase.isSupportNotification()) {
            return Firebase.getToken().then(token => NotificationService.addDeviceToken$(UserService.getUserId(), token));
          }
        })
        .catch(() => handleLoginError())
    );
  };

  const onGoogleLogin = () => {
    GoogleAuth.signStatusChange$((isSignIn: boolean) => {
      if (isSignIn) {
        authContext
          .checkAuth$()
          .then(() => {
            if (Firebase.isSupportNotification()) {
              return Firebase.getToken().then(token => NotificationService.addDeviceToken$(UserService.getUserId(), token));
            }
          })
          .catch(error => handleLoginError());
      } else {
        handleLoginError();
      }
    });
    HttpClient.middle(GoogleAuth.login$().catch(() => handleLoginError()));
  };

  const redirectPath = () => {
    return props.location?.search.split('=')[1] || '/user';
  };

  return (
    <Page central={true}>
      {authContext.authorized ? <Redirect to={redirectPath()} /> : null}
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
