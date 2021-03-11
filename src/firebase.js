import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDrdsY1-bRXz2NfOb3pgsi5VauQt8EVQRU",
    authDomain: "bt3103-week-6-773d8.firebaseapp.com",
    projectId: "bt3103-week-6-773d8",
    storageBucket: "bt3103-week-6-773d8.appspot.com",
    messagingSenderId: "161192172617",
    appId: "1:161192172617:web:7a1f6f4248d5cc233bb398",
    measurementId: "G-V23F34QFJL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;