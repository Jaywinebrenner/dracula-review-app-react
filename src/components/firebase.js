import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "dracula-review.firebaseapp.com",
    projectId: "dracula-review",
    storageBucket: "dracula-review.appspot.com",
    messagingSenderId: "318895212850",
    appId: "1:318895212850:web:59fc8d5474a192da862f2b",
    measurementId: "G-NT76L3X19F"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth()

  export const storage = firebase.storage()

  export default firebase;

