import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/messaging';
export interface NotifyConfig {
  title: string;
  message: string;
  token: string;
  link?: string;
}

export interface MultiNotifyConfig {
  title: string;
  message: string;
  tokens: string[];
  link?: string;
}

/* npm install firebase@7.2.3 */
class FirebaseRegister {
  private application!: firebase.app.App;
  private database!: firebase.firestore.Firestore;
  private analytics!: firebase.analytics.Analytics;
  private message!: firebase.messaging.Messaging;
  private config = {
    apiKey: 'AIzaSyDE10tLBnUsJiSErS_qhInhOlBvVDsZrAA',
    authDomain: 'debt-assistant.firebaseapp.com',
    databaseURL: 'https://debt-assistant.firebaseio.com',
    projectId: 'debt-assistant',
    storageBucket: 'debt-assistant.appspot.com',
    messagingSenderId: '232567755974',
    appId: '1:232567755974:web:22edb092ec8bb4074b73c7',
    measurementId: 'G-YNGS54G08J'
  };
  private vapidKey = 'BLUdzB2_QYh_6gbmWeyMkWt4Lt43Mp78Yl20tj6nv0kFIeAcqcNatpFemu_8kduwtypTaO8WW42GS2NiMjK7oWE';
  private serviceWorkerRegistration!: ServiceWorkerRegistration;

  get app(): firebase.app.App {
    return this.application;
  }

  get db(): firebase.firestore.Firestore {
    return this.database;
  }

  get analysis(): firebase.analytics.Analytics {
    return this.analytics;
  }

  get messaging(): firebase.messaging.Messaging {
    return this.message;
  }

  get serviceWorkerRegistration$(): Promise<ServiceWorkerRegistration> {
    const awaitRegistration = (): Promise<ServiceWorkerRegistration> => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          if (!this.serviceWorkerRegistration) {
            await awaitRegistration();
          }
          resolve(this.serviceWorkerRegistration);
        }, 1_000);
      });
    };
    return awaitRegistration();
  }

  isSupportNotification(): boolean {
    return firebase.messaging.isSupported();
  }

  init() {
    this.application = firebase.initializeApp(this.config);
    this.analytics = this.application.analytics();
    this.database = this.application.firestore();
    if (this.isSupportNotification()) {
      this.message = this.application.messaging();
    }
  }

  setServiceWorkerRegistration(serviceWorkerRegistration: ServiceWorkerRegistration) {
    this.serviceWorkerRegistration = serviceWorkerRegistration;
  }

  /**
   * use Notification.requestPermission() if device token is undefined
   */
  getToken(): Promise<string> {
    return this.message.getToken({
      vapidKey: this.vapidKey,
      serviceWorkerRegistration: this.serviceWorkerRegistration
    });
  }

  deleteToken(): Promise<boolean> {
    return this.message.deleteToken();
  }

  notify(req: NotifyConfig) {
    return fetch('https://yur-debt-assistant.herokuapp.com/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: req.token,
        title: req.title,
        message: req.message,
        image: 'https://marshal604.github.io/debt-assistant/favicon.jpg',
        link: req.link
      })
    })
      .then(function(response) {
        console.log('response', response);
      })
      .catch(function(error) {
        console.error('error', error);
      });
  }

  multiNotify(req: MultiNotifyConfig) {
    return fetch('https://yur-debt-assistant.herokuapp.com/multi-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokens: req.tokens,
        title: req.title,
        message: req.message,
        image: 'https://marshal604.github.io/debt-assistant/favicon.jpg',
        link: req.link
      })
    })
      .then(function(response) {
        console.log('response', response);
      })
      .catch(function(error) {
        console.error('error', error);
      });
  }
}
const Firebase = new FirebaseRegister();
export default Firebase;
