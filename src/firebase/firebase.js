import firebase from 'firebase';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyA-i99WpO1-w58fSM82FISJ7XrSpgtvqZQ",
    authDomain: "chat-app-297f3.firebaseapp.com",
    projectId: "chat-app-297f3",
    storageBucket: "chat-app-297f3.appspot.com",
    messagingSenderId: "517906581107",
    appId: "1:517906581107:web:c1cd61123b11a0e1a4cc06"
  }).auth();