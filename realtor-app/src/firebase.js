import { initializeApp } from "firebase/app";

import {
getAuth
} from "firebase/auth";

const firebaseConfig = {

apiKey: "AIzaSyASuPC9vSLRr8lwFEYETjllOzXEVhJfTQI",

authDomain: "realtor-app-4e688.firebaseapp.com",

projectId: "realtor-app-4e688",

storageBucket: "realtor-app-4e688.firebasestorage.app",

messagingSenderId: "1024494362153",

appId: "1:1024494362153:web:a65d7d71737e92cf1b0638",

measurementId: "G-4TEF4R321S"

};

const app =
initializeApp(firebaseConfig);

export const auth =
getAuth(app);