import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3-Xzs7hjaR05C9gTJN9BS97QZ-GILX9I",
    authDomain: "subscriptions-4da2b.firebaseapp.com",
    projectId: "subscriptions-4da2b",
    storageBucket: "subscriptions-4da2b.appspot.com",
    messagingSenderId: "403932564528",
    appId: "1:403932564528:web:de8182d468c4449c0731f5"
};

const db = firebase.initializeApp(firebaseConfig);
export default db.firestore();
