import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging} from 'firebase/messaging';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaUaNJe050MkvaSfL2LOw24AnXKN2Sl60",
    authDomain: "esmp-4b85e.firebaseapp.com",
    projectId: "esmp-4b85e",
    storageBucket: "esmp-4b85e.appspot.com",
    messagingSenderId: "688134919204",
    appId: "1:688134919204:web:30ff46cd8f249d5c3974b1",
    measurementId: "G-RC5NW6R459"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const messaging = getMessaging(app);
export default app;


