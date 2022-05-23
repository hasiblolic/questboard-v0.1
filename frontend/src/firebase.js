import { initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHjHQ3Ksjzj6sTAjnxKqmc8okvyUzw_D4",
  authDomain: "quest-board-64774.firebaseapp.com",
  projectId: "quest-board-64774",
  storageBucket: "quest-board-64774.appspot.com",
  messagingSenderId: "295193593548",
  appId: "1:295193593548:web:e87bd65831d3817daf6469",
  measurementId: "G-5FFJ740K99"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  storage,
  provider,
  analytics
};