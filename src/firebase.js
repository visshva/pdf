
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA-sD_ZEd9xydoIfU74QvgbtLl5mlSZ2Kg",
    authDomain: "iqacdoc.firebaseapp.com",
    projectId: "iqacdoc",
    storageBucket: "iqacdoc.appspot.com",
    messagingSenderId: "399729857158",
    appId: "1:399729857158:web:f77a2a3736937a394b3707",
    measurementId: "G-GMC1T2NSY3"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Initialize Firebase services
const storage = getStorage(app);
const auth = getAuth(app);

export { db,storage, auth };