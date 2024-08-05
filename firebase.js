// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTTTEJCvUyQdvWixShqWu8UZPAsJKzV7w",
  authDomain: "ezpantry-mk.firebaseapp.com",
  projectId: "ezpantry-mk",
  storageBucket: "ezpantry-mk.appspot.com",
  messagingSenderId: "40747942157",
  appId: "1:40747942157:web:7c2414f8e9e74555f1b044",
  measurementId: "G-FK9DCW264X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
