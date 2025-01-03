// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0oEJ_y-sWxJB89YK4pGbzaTxFPv_f34M",
  authDomain: "code-arena-testing.firebaseapp.com",
  projectId: "code-arena-testing",
  storageBucket: "code-arena-testing.firebasestorage.app",
  messagingSenderId: "411512679213",
  appId: "1:411512679213:web:ae4ccd752f848a72c941a4",
  measurementId: "G-9CHGJ299K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;