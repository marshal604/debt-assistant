// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.22.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.22.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: 'AIzaSyDE10tLBnUsJiSErS_qhInhOlBvVDsZrAA',
  authDomain: 'debt-assistant.firebaseapp.com',
  databaseURL: 'https://debt-assistant.firebaseio.com',
  projectId: 'debt-assistant',
  storageBucket: 'debt-assistant.appspot.com',
  messagingSenderId: '232567755974',
  appId: '1:232567755974:web:22edb092ec8bb4074b73c7',
  measurementId: 'G-YNGS54G08J'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || `https://marshal604.github.io/debt-assistant/favicon.jpg`
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
} else {
  console.log('[firebase-messaging-sw.js] Not Support Notification');
}
