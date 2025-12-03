const admin = require('firebase-admin');
const callGemini = require('./geminiClient');

module.exports = async (req, res) => {
  try {
    const { uid='demo', schedule='daily 09:00', lastTaken=null } = req.body || {};
    const prompt = `Medication schedule: ${schedule} Last taken: ${lastTaken} Decide if overdue. Return JSON:{"overdue":true|false,"message":"","hoursLate":0}`;
    const reply = await callGemini(prompt);
    let parsed;
    try { parsed = JSON.parse(reply); } catch(e) { parsed = { raw: reply }; }
    await admin.database().ref(`/medication/${uid}/${Date.now()}`).set(parsed);
    if(parsed && parsed.overdue){
      await admin.database().ref(`/notifications/${uid}`).push({ type: 'medication', message: parsed.message || 'Medication overdue', ts: Date.now() });
    }
    res.json({ ok:true, agent:'medication', result: parsed });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
