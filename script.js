const darkModeButton = document.getElementById("dark-mode-btn");
const guideForm = document.getElementById("guide-form");
const guideQuestion = document.getElementById("guide-question");
const guideAnswer = document.getElementById("guide-answer");

// The key comes from config.js, which is kept out of git. See the README.
const geminiApiKey = typeof GEMINI_API_KEY === "undefined" ? "" : GEMINI_API_KEY;

const portfolioFacts = `
Name: Alex Rivera
About: A student learning web development, design, and creative coding.
Skills: HTML, CSS, JavaScript, GitHub, VS Code, Figma, design, accessibility.
Projects: A personal portfolio website and small class projects.
`;

darkModeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

guideForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!geminiApiKey || geminiApiKey === "PASTE_YOUR_KEY_HERE") {
    guideAnswer.textContent = "Add your Gemini API key to config.js first. See the README.";
    return;
  }

  guideAnswer.textContent = "Thinking...";

  const prompt = `You are a helpful guide for this portfolio. Answer only with the portfolio details below. If the answer is not included, say that you do not have that information. Keep the answer under 80 words.\n\nPortfolio details:\n${portfolioFacts}\n\nVisitor question: ${guideQuestion.value}`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiApiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini could not answer right now.");
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map(function (part) {
        return part.text || "";
      })
      .join("")
      .trim();

    guideAnswer.textContent = answer || "Gemini did not return an answer. Please try again.";
  } catch (error) {
    guideAnswer.textContent = `Sorry, something went wrong: ${error.message}`;
  }
});
