import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

/* npm install firebase@7.2.3 */
class FirebaseRegister {
  private database!: firebase.firestore.Firestore;
  private analytics!: firebase.analytics.Analytics;
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

  get db(): firebase.firestore.Firestore {
    return this.database;
  }

  get analysis(): firebase.analytics.Analytics {
    return this.analytics;
  }

  init() {
    const app = firebase.initializeApp(this.config);
    this.analytics = app.analytics();
    this.database = app.firestore();
  }
}
const Firebase = new FirebaseRegister();
export default Firebase;
