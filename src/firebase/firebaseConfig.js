
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore';
import Axios from 'axios'

var firebaseConfig = {
  apiKey: "AIzaSyCLrPehDKNW7uNRfKC5wvSYK6stpMRCBzc",
  authDomain: "sam-tufail.firebaseapp.com",
  projectId: "sam-tufail",
  storageBucket: "sam-tufail.appspot.com",
  messagingSenderId: "625960615999",
  appId: "1:625960615999:web:f77664e536fb5b57c3788a",
  measurementId: "G-MCPP7S8L7M"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { Axios, db }