import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBrctjqOkyZCu7GGOw4JghBxNHMdJA9ewE",
    authDomain: "video-search-1bb50.firebaseapp.com",
    projectId: "video-search-1bb50",
    storageBucket: "video-search-1bb50.appspot.com",
    messagingSenderId: "67051577588",
    appId: "1:67051577588:web:606289e96c27d899613ea1"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {auth};
export {storage};
export default db;
