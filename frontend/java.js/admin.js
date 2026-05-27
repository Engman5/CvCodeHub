import { db } from "./firebase.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

window.loadUsers = async function () {
  const snap = await getDocs(collection(db, "users"));

  let html = "";

  snap.forEach((doc) => {
    const u = doc.data();

    html += `
      <div>
        <p>${u.email}</p>
        <p>${u.plan}</p>
      </div>
    `;
  });

  document.getElementById("users").innerHTML = html;
};

window.loadCVs = async function () {
  const snap = await getDocs(collection(db, "cvs"));

  let html = "";

  snap.forEach((doc) => {
    const c = doc.data();

    html += `
      <div>
        <p>${c.name}</p>
        <p>${c.skills}</p>
      </div>
    `;
  });

  document.getElementById("cvs").innerHTML = html;
};
