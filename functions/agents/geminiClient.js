const fetch = require('node-fetch');

async function callGemini(prompt){
  const key = process.env.GEMINI_API_KEY;
  if(!key) throw new Error('GEMINI_API_KEY not set in env (functions/.env or functions config)');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const resp = await fetch(url, { method: 'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });
  const data = await resp.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

module.exports = callGemini;
