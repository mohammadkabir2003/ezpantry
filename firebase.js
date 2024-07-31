// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWm68islblTID1wmhF7F8oQ-3P5sD66TY",
  authDomain: "ezpantry-app.firebaseapp.com",
  projectId: "ezpantry-app",
  storageBucket: "ezpantry-app.appspot.com",
  messagingSenderId: "431486519419",
  appId: "1:431486519419:web:650ba30bb54ce15557bade",
  measurementId: "G-NJSGKR58CT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
