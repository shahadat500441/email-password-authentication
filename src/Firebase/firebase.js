import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRuz51zTaYnITXuavR6rvSsg3hhQLqQ3k",
  authDomain: "email-password-authentic-c66e4.firebaseapp.com",
  projectId: "email-password-authentic-c66e4",
  storageBucket: "email-password-authentic-c66e4.appspot.com",
  messagingSenderId: "30147941354",
  appId: "1:30147941354:web:a764346d708a456f121893"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth;