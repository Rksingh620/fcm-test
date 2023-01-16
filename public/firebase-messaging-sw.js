// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBPJ4moFq_0EaJAQeogSw2O7a4tw9JhyD8",
    authDomain: "fcm-test-19479.firebaseapp.com",
    projectId: "fcm-test-19479",
    storageBucket: "fcm-test-19479.appspot.com",
    messagingSenderId: "602324912057",
    appId: "1:602324912057:web:a8315f0b82f603af321868",
    measurementId: "G-JEMM12QQDR",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});