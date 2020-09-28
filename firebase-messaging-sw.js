importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

const messaging = firebase.messaging();
console.log('==> onBackgroundMessage');
messaging.onBackgroundMessage(function(payload) {
  console.log('Firebase.messaging.setBackgroundMessageHandler');

  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: `${process.env.PUBLIC_URL}/favicon.jpg`
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
console.log('Firebase.messaging.setBackgroundMessageHandler Finish');
