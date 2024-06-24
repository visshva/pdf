
import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, getDocs,doc, deleteDoc,limit } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-sD_ZEd9xydoIfU74QvgbtLl5mlSZ2Kg",
    authDomain: "iqacdoc.firebaseapp.com",
    projectId: "iqacdoc",
    storageBucket: "iqacdoc.appspot.com",
    messagingSenderId: "399729857158",
    appId: "1:399729857158:web:f77a2a3736937a394b3707",
    measurementId: "G-GMC1T2NSY3"
};
const app = firebase.initializeApp(firebaseConfig);



// Initialize Firebase services
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { storage, auth ,db,collection, addDoc, query, orderBy, getDocs ,ref, uploadBytes, getDownloadURL,limit, deleteObject ,doc, deleteDoc,};
