window.generateAISummary = async function () {
  const skills = document.getElementById("skills").value;

  if (!skills) {
    alert("Enter skills first");

    return;
  }

  const response = await fetch("YOUR_FIREBASE_FUNCTION_URL", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ skills }),
  });

  const data = await response.json();

  document.getElementById("experience").value = data.result;
};
