import * as firebase from 'firebase'

const firebaseConfig = {

    apiKey: "***********************",
    authDomain: "food-delivery23.firebaseapp.com",
    databaseURL: "https://food-delivery23.firebaseio.com",
    projectId: "food-delivery23",
    storageBucket: "**********************",
    messagingSenderId: '***********',
    appId: "****************************"

  };

  const fire = firebase.initializeApp(firebaseConfig)
  const db = firebase.database()

  export { fire, db };
