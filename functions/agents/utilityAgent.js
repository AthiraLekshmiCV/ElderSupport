const admin = require('firebase-admin');
const callGemini = require('./geminiClient');

module.exports = async (req, res) => {
  try {
    const { uid='demo', question='' } = req.body || {};
    const prompt = `Answer simply for elderly: ${question} Return JSON:{"answer":"","confidence":"high|medium|low"}`;
    const reply = await callGemini(prompt);
    let parsed;
    try { parsed = JSON.parse(reply); } catch(e) { parsed = { raw: reply }; }
    await admin.database().ref(`/utility/${uid}/${Date.now()}`).set(parsed);
    res.json({ ok:true, agent:'utility', result: parsed });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
