// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: "clever-overview-326002.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_MESASAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const storage = getStorage(app);
 export { storage }; // E