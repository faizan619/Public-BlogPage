import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD359O9u8smr1ES4JM2vNknfS_Y3vCz8x0",
  authDomain: "react-blog1.firebaseapp.com",
  projectId: "react-blog1",
  storageBucket: "react-blog1.appspot.com",
  messagingSenderId: "435875307356",
  appId: "1:435875307356:web:96ee3622cefeba441d6b99",
  measurementId: "G-BJE57HNRL7"
});

const fb = firebase;
export default fb;
