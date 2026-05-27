import { db, auth } from "./firebase.js";

import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

window.saveCV = async function () {
  const user = auth.currentUser;

  const cv = {
    uid: user.uid,

    name: document.getElementById("name").value,

    phone: document.getElementById("phone").value,

    education: document.getElementById("education").value,

    skills: document.getElementById("skills").value,

    experience: document.getElementById("experience").value,
  };

  await addDoc(collection(db, "cvs"), cv);

  alert("CV Saved");
};
