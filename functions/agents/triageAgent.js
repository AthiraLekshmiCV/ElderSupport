const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",   // ⭐ FIXED
    });

    const prompt = `
      Elderly triage query:
      Symptoms: ${req.body.symptoms}
      Mood: ${req.body.mood}
    `;

    const result = await model.generateContent(prompt);

    res.json({
      response: result.response.text()
    });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};
