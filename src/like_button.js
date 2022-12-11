// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyCbfCsUOgBT66adFISKg-W-0eBmK6UOESw",

    authDomain: "roguelike-7aea2.firebaseapp.com",

    projectId: "roguelike-7aea2",

    storageBucket: "roguelike-7aea2.appspot.com",

    messagingSenderId: "1092661927629",

    appId: "1:1092661927629:web:f8670b4c213c0867c19384",

    measurementId: "G-S4SHGRL0TJ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
