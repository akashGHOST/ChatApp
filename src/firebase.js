import firebase from 'firebase/app';
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyAfn_PcTd6WaOZiGz5F5Kz3bWUnzijocxA",
    authDomain: "unichat-83745.firebaseapp.com",
    projectId: "unichat-83745",
    storageBucket: "unichat-83745.appspot.com",
    messagingSenderId: "862180661432",
    appId: "1:862180661432:web:4dd7f3f4c6065ecbe23c4d"
  }).auth();