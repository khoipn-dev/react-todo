import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDXwhGsdk3fAcnDZVZ8_dkeoQHoKrk9Yc8",
  authDomain: "blog-c236c.firebaseapp.com",
  databaseURL: "https://blog-c236c.firebaseio.com",
  projectId: "blog-c236c",
  storageBucket: "blog-c236c.appspot.com",
  messagingSenderId: "157660293521",
  appId: "1:157660293521:web:18333f7c8d70b855"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const TodoStore = firebase.database().ref('todos');