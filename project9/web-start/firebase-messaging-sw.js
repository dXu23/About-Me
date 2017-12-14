importScripts('/__/firebase/3.8.0/firebase-app.js');
importScripts('/__/firebase/3.8.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

var config = {
    apiKey: "AIzaSyAdUs4zn0qFJ3H0y4tElQc64K82nj_8Vuo",
    authDomain: "friendlychat-659b2.firebaseapp.com",
    databaseURL: "https://friendlychat-659b2.firebaseio.com/",
    projectId: "friendlychat-659b2",
    storageBucket: "friendlychat-659b2.appspot.com",
    messagingSenderId: "241800953801"
}

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});