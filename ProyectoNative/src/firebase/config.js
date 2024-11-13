import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDuEpZ4gix0RREm0YamsijbZEcibeVH-M",
    authDomain: "integradorrn.firebaseapp.com",
    projectId: "integradorrn",
    storageBucket: "integradorrn.firebasestorage.app",
    messagingSenderId: "268415785738",
    appId: "1:268415785738:web:dc228f79bac3bfecf6f8f3"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();