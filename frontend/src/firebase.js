import { initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


export {
  db,
  auth,
  storage,
  provider,
  analytics
};