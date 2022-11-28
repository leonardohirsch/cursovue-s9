import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACy1ILPOUh8qYQ1UIaAT-QmujCLdV6Nlo",
  authDomain: "mimuvidb-dcbeb.firebaseapp.com",
  projectId: "mimuvidb-dcbeb",
  storageBucket: "mimuvidb-dcbeb.appspot.com",
  messagingSenderId: "2013396626",
  appId: "1:2013396626:web:30aa60dee60a01fc62704b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);