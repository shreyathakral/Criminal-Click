// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";



// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA9XI7bWC5PEeJE59gjd1mL6xgo39o9O2o",
  authDomain: "face-recognition-af75b.firebaseapp.com",
  projectId: "face-recognition-af75b",
  storageBucket: "face-recognition-af75b.appspot.com",
  messagingSenderId: "65324606819",
  appId: "1:65324606819:web:b686f405d92e5e52679f56",
  measurementId: "G-SN22VK2QP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Sign up function
let sign_up =()=>{
  let email=document.getElementById("Email");
  let password=document.getElementById("password");
  // console.log(email.value)
  // console.log(password.value)

const auth = getAuth();
createUserWithEmailAndPassword(auth, email.value, password.value)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  window.location.href = "Home.html"

  // ...
  //console.log("signed up")
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
  alert(errorMessage)
});

}

const button1=document.getElementById("btn1")
button1.addEventListener("click",sign_up);

