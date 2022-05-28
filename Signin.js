// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


//Sign in function


let sign_in =()=>{
  let email=document.getElementById("Email");
  let password=document.getElementById("password");

const auth1 = getAuth();
signInWithEmailAndPassword(auth1, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("signedin")
    window.location.href = "Home.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}

  const button2=document.getElementById("btn2")
button2.addEventListener("click",sign_in);
