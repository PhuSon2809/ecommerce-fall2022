// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzAi-J7zpewthShvrArHjqgi_iLENxMDw",
  authDomain: "ecomecse.firebaseapp.com",
  projectId: "ecomecse",
  storageBucket: "ecomecse.appspot.com",
  messagingSenderId: "865914155266",
  appId: "1:865914155266:web:ddb77a73ee6ca5023a921b",
  measurementId: "G-TDDPYSJW29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { app, storage };
