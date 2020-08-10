import { AuthInfo } from 'src/shared/models/user';

declare var gapi: any;
class GoogleAuth {
  auth: any;
  gapi: any;
  constructor() {
    this.init();
  }

  initClient() {
    gapi.client
      .init({
        clientId: '725873133009-jokak7dg3p6cp613bv8clj7u7opop2c7.apps.googleusercontent.com',
        scope: 'profile'
      })
      .then(() => {
        this.auth = gapi.auth2.getAuthInstance();
        gapi = undefined;
      });
  }

  checkLoginStatus$(): Promise<boolean> {
    return this.waitGoogleInit().then(() => {
      const user = this.auth.currentUser.get();
      return user.isSignedIn();
    });
  }

  login$(): Promise<void> {
    return this.waitGoogleInit().then(() => {
      return this.auth.signIn();
    });
  }

  logout$(): Promise<void> {
    return this.waitGoogleInit().then(() => {
      return this.auth.signOut();
    });
  }

  signStatusChange$(callback: Function): Promise<void> {
    return this.waitGoogleInit().then(() => {
      this.auth.isSignedIn.listen(callback);
    });
  }

  getUserInfo(): AuthInfo {
    const user = this.auth.currentUser.get();
    return {
      name: user.getBasicProfile().getName(),
      id: user.getBasicProfile().getId(),
      email: user.getBasicProfile().getEmail()
    };
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  private init() {
    const id = 'googleOauthSdk';
    if (document.getElementById(id)) {
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://apis.google.com/js/api.js';
    s.setAttribute('defer', '');
    s.setAttribute('async', '');
    s.id = id;
    s.onload = () => this.load();
    document.body.append(s);
  }

  private load() {
    this.gapi = gapi;
    gapi.load('client:auth2', () => this.initClient());
  }

  private waitGoogleInit(): Promise<void> {
    const self = this;
    return new Promise(function wait(resolve) {
      if (self.auth) {
        resolve();
        return;
      }
      setTimeout(() => wait(resolve), 500);
    });
  }
}
const instance = new GoogleAuth();
export default instance;
