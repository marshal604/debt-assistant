declare var FB: any;
export interface FBAuthInfo {
  id: string;
  name: string;
  email: string;
}

/**
 * for FB Oauth Login
 * @class FbAuth
 */
class FbAuth {
  auth: any;

  constructor() {
    this.init();
  }

  /**
   * first login or click login button
   * @returns {Promise<void>}
   * @memberof FbAuth
   */
  login$(): Promise<FBAuthInfo> {
    return this.waitFbInit().then(
      () =>
        new Promise((resolve, reject) => {
          this.auth.login(
            (data: any) => {
              if (data.status !== 'connected') {
                reject(new Error('Connect FB Failure.'));
                return;
              }
              resolve(this.queryAuthInfo$());
            },
            { scope: 'public_profile,email' }
          );
        })
    );
  }

  logout$(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.logout(function(res: any) {
        resolve(res);
      });
    });
  }
  /**
   * check login status in other page
   * case1 try login when user logout status
   * case2 fetch user info of facebook when login status
   * @returns {Promise<FBAuthInfo>}
   * @memberof FbAuth
   */
  tryLogin$(): Promise<FBAuthInfo> {
    return this.waitFbInit()
      .then(() => this.checkLoginStatus$())
      .then(login => {
        if (login) {
          return this.queryAuthInfo$();
        } else {
          return this.login$().then(() => this.queryAuthInfo$());
        }
      });
  }

  /**
   * for check fb login status
   *
   * @returns {Promise<boolean>}
   * @memberof FbAuth
   */
  checkLoginStatus$(): Promise<boolean> {
    return this.waitFbInit().then(
      () =>
        new Promise(resolve => {
          this.auth.getLoginStatus(({ status }: any) => {
            if (status === 'connected') {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        })
    );
  }

  /**
   * get user info of facebook
   *
   *
   * @returns {Promise<FBAuthInfo>}
   * @memberof FbAuth
   */
  queryAuthInfo$(): Promise<FBAuthInfo> {
    return this.waitFbInit().then(
      () =>
        new Promise(resolve => {
          this.auth.api(
            '/me',
            'GET',
            {
              fields: 'id,name,email'
            },
            (res: FBAuthInfo) => resolve(res)
          );
        })
    );
  }

  /**
   * init FB SDK
   * @private
   * @returns
   * @memberof FbAuth
   */
  private init() {
    const id = 'facebook-jssdk';
    if (document.getElementById('id')) {
      return;
    }
    (window as any).fbAsyncInit = () => {
      (FB as any).init({
        appId: '375295463090214',
        cookie: true,
        xfbml: true,
        version: 'v7.0'
      });
      this.auth = FB;
      this.auth.AppEvents.logPageView();
      FB = undefined;
    };

    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.body.append(s);
  }

  private waitFbInit(): Promise<void> {
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

const instance = new FbAuth();
export default instance;
