const admin = require('firebase-admin');
const callGemini = require('./geminiClient');

module.exports = async (req, res) => {
  try {
    const { uid='demo', fallDetected=false, battery=100, location=null } = req.body || {};
    const prompt = `You are a Safety Monitoring Agent.
Fall:${fallDetected} Battery:${battery} Location:${location}
Return JSON:{"alert":true|false,"reason":"","familyMessage":""}`;
    const reply = await callGemini(prompt);
    let parsed;
    try { parsed = JSON.parse(reply); } catch(e) { parsed = { raw: reply }; }
    await admin.database().ref(`/safety/${uid}/${Date.now()}`).set(parsed);
    if(parsed && parsed.alert){
      await admin.database().ref(`/notifications/${uid}`).push({ type: 'safety', message: parsed.familyMessage || 'Safety alert', ts: Date.now() });
    }
    res.json({ ok:true, agent:'safety', result: parsed });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
