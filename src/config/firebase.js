import * as firebase from 'firebase'

const firebaseConfig = {

    apiKey: '',
    authDomain: 
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',

  };

  const fire = firebase.initializeApp(firebaseConfig)
  const db = firebase.database()

  export { fire, db };
