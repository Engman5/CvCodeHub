const functions = require("firebase-functions");

const fetch = require("node-fetch");

exports.generateCV = functions.https.onRequest(async (req, res) => {
  const skills = req.body.skills;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY",
    },

    body: JSON.stringify({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "user",
          content: `Write a professional CV summary for ${skills}`,
        },
      ],
    }),
  });

  const data = await response.json();

  res.send({
    result: data.choices[0].message.content,
  });
});
