
importScripts(
  'https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyBjiO_Aw1PBCp-YOJVz1pYqzAd0_U5c9_U","authDomain":"presentacion42-3fe1d.firebaseapp.com","databaseURL":"https:\u002F\u002Fpresentacion42-3fe1d.firebaseio.com","projectId":"presentacion42-3fe1d","storageBucket":"presentacion42-3fe1d.appspot.com","messagingSenderId":"524942001673","appId":"1:524942001673:web:e0bd6b407aff525d8f9ad8","measurementId":"G-QQLCFNQDEK"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
