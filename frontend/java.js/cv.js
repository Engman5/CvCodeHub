import { db, auth } from "./firebase.js";

import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

window.saveCV = async function () {
  const user = auth.currentUser;

  const cv = {
    uid: user.uid,
    template: document.getElementById("template").value,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    education: document.getElementById("education").value,
    skills: document.getElementById("skills").value,
    experience: document.getElementById("experience").value,
  };

  await addDoc(collection(db, "cvs"), cv);

  alert("CV Saved");
};

window.updatePreview = function () {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const title = document.getElementById("title")?.value.trim() || '';
  const email = document.getElementById("email")?.value.trim() || '';
  const location = document.getElementById("location")?.value.trim() || '';
  const linkedin = document.getElementById("linkedin")?.value.trim() || '';
  const summary = document.getElementById("summary")?.value.trim() || '';
  const education = document.getElementById("education").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const template = document.getElementById("template").value;

  document.getElementById("previewName").textContent = name || "Full Name";
  document.getElementById("previewTitle").textContent = title || "Professional Title";
  document.getElementById("previewContact").textContent = (email || 'name@company.com') + (location ? ' • ' + location : '') + (phone ? ' • ' + phone : '');
  document.getElementById("previewSummary").textContent = summary || "A short, impactful paragraph that highlights your strengths and career goals.";
  document.getElementById("previewEducation").textContent = education || "Add your education details to show your qualifications.";
  document.getElementById("previewSkills").textContent = skills || "Add your strongest skills and highlights.";
  document.getElementById("previewExperience").textContent = experience || "Add your work history and achievements.";
  document.getElementById("templateLabel").textContent = template.charAt(0).toUpperCase() + template.slice(1);

  const previewCard = document.getElementById("previewCard");
  previewCard.classList.remove("pulse-highlight");
  void previewCard.offsetWidth;
  previewCard.classList.add("pulse-highlight");
};

window.addEventListener("DOMContentLoaded", updatePreview);

// Helper used by the template gallery buttons
window.selectTemplate = function (name) {
  const select = document.getElementById('template');
  if (!select) return;
  select.value = name;
  // toggle visual selected state
  const thumbs = document.querySelectorAll('.template-thumb');
  thumbs.forEach(t => t.classList.toggle('selected', t.id === 'thumb-' + name));
  updatePreview();
};

// Extend saveCV to include new fields
window.saveCV = async function () {
  const user = (window.auth && window.auth.currentUser) || null;

  const cv = {
    uid: user?.uid || null,
    template: document.getElementById("template").value,
    name: document.getElementById("name").value,
    title: document.getElementById("title")?.value || '',
    email: document.getElementById("email")?.value || '',
    location: document.getElementById("location")?.value || '',
    linkedin: document.getElementById("linkedin")?.value || '',
    summary: document.getElementById("summary")?.value || '',
    phone: document.getElementById("phone").value,
    education: document.getElementById("education").value,
    skills: document.getElementById("skills").value,
    experience: document.getElementById("experience").value,
  };

  try {
    if (user && window.addDoc) {
      await addDoc(collection(db, "cvs"), cv);
      alert('CV saved');
    } else {
      // Local fallback
      localStorage.setItem('cv-draft', JSON.stringify(cv));
      alert('CV saved locally');
    }
  } catch (e) {
    console.error(e);
    alert('Error saving CV');
  }
};
