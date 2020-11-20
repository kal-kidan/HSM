importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyBaQGbjNitkicHI4iol7p14iWfUREEviTo",
    authDomain: "hsm-system.firebaseapp.com",
    databaseURL: "https://hsm-system.firebaseio.com",
    projectId: "hsm-system",
    storageBucket: "hsm-system.appspot.com",
    messagingSenderId: "924248118131",
    appId: "1:924248118131:web:3ddd39a5173a6b15a26b06",
    measurementId: "G-3MH4XV2E3C"
  }
  var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_FIREBASE_DOMAIN_NAME",
    databaseURL: "YOUR_FIREBASE_DATBASE_URL",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET END WITH appspot.com",
    messagingSenderId: "YOUR SENDER ID",
    appId: "YOUR APP ID",
    measurementId: "YOUR MEASUREMENT ID"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});