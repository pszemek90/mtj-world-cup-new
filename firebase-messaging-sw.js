importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyABMhM99823wTjaCjaebgg-xUAZMpF4bsA",
  authDomain: "mtj-euro-aws.firebaseapp.com",
  projectId: "mtj-euro-aws",
  storageBucket: "mtj-euro-aws.appspot.com",
  messagingSenderId: "499875527127",
  appId: "1:499875527127:web:a78abae6e753aec085b392",
  measurementId: "G-8PM2H0R1JT"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'android-chrome-192x192.png',
    data: {
      url: self.location.origin
    }
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log("notificationclick", event)
  var urlToRedirect = event.notification.data.url;
  event.notification.close();
  event.waitUntil(self.clients.openWindow(urlToRedirect));
});