import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

window.signup = async function () {
  const name = document.getElementById("signup-name").value;

  const email = document.getElementById("signup-email").value;

  const password = document.getElementById("signup-password").value;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: name,

    email: email,

    plan: "free",

    referralCode: generateReferralCode(),
  });

  alert("Signup Successful");

  window.location.href = "cv-builder.html";
};

window.login = async function () {
  const email = document.getElementById("login-email").value;

  const password = document.getElementById("login-password").value;

  await signInWithEmailAndPassword(auth, email, password);

  alert("Login Successful");

  window.location.href = "cv-builder.html";
};
