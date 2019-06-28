import * as firebase from 'firebase'

const firebaseConfig = {

    apiKey: "AIzaSyBHcTkGUmNUjQvEASaXasvWUiE2dNGAPdg",
    authDomain: "food-delivery23.firebaseapp.com",
    databaseURL: "https://food-delivery23.firebaseio.com",
    projectId: "food-delivery23",
    storageBucket: "food-delivery23.appspot.com",
    messagingSenderId: "443235899488",
    appId: "1:443235899488:web:a4a015aaf500e04b"

  };

  const fire = firebase.initializeApp(firebaseConfig)
  const db = firebase.database()

  export { fire, db };