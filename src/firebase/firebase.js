import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAJdC1ktEsznh4uYhy12fSODLjr0SgQ3kI",
    authDomain: "o-my-goal.firebaseapp.com",
    databaseURL: "https://o-my-goal.firebaseio.com",
    projectId: "o-my-goal",
    storageBucket: "o-my-goal.appspot.com",
    messagingSenderId: "753360480495",
    appId: "1:753360480495:web:e91e62f36127aeb565131a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
