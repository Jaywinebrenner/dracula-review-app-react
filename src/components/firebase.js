// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyDKIAiprzYz1GT7QFoCTgZNvaoVjW-Tcb4",
//     authDomain: "dracula-review.firebaseapp.com",
//     projectId: "dracula-review",
//     storageBucket: "dracula-review.appspot.com",
//     messagingSenderId: "318895212850",
//     appId: "1:318895212850:web:59fc8d5474a192da862f2b",
//     measurementId: "G-NT76L3X19F"
//   };

//   firebase.initializeApp(firebaseConfig);

//   export const auth = firebase.auth();

//   export const storage = firebase.storage();

//   export default firebase;

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import the storage service

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "dracula-review.firebaseapp.com",
    projectId: "dracula-review",
    storageBucket: "dracula-review.appspot.com",
    messagingSenderId: "318895212850",
    appId: "1:318895212850:web:59fc8d5474a192da862f2b",
    measurementId: "G-NT76L3X19F"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); // Export firestore if needed
export const storage = firebase.storage(); // Export storage service

export default firebase;
