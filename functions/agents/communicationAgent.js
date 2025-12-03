const admin = require('firebase-admin');
const callGemini = require('./geminiClient');

module.exports = async (req, res) => {
  try {
    const { uid='demo', messageToFamily='' } = req.body || {};
    const prompt = `Rewrite warmly: "${messageToFamily}" Return JSON:{"rewrittenMessage":"","tone":"warm|neutral|urgent"}`;
    const reply = await callGemini(prompt);
    let parsed;
    try { parsed = JSON.parse(reply); } catch(e) { parsed = { raw: reply }; }
    await admin.database().ref(`/communication/${uid}/${Date.now()}`).set(parsed);
    res.json({ ok:true, agent:'communication', result: parsed });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
