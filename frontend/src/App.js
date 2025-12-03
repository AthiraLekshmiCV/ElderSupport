import React, {useState} from 'react';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/elderly-support/us-central1/api';

function App(){
  const [symptoms,setSymptoms]=useState('');
  const [mood,setMood]=useState('');
  const submit = async () => {
    const res = await fetch(API_BASE + '/triageAgent', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ uid: 'demo', symptoms, mood, notes: '' })
    });
    const j = await res.json();
    alert('Result: ' + JSON.stringify(j.result));
  };
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h1>Elderly Support — Demo</h1>
      <div>
        <label>Symptoms</label><br/>
        <input value={symptoms} onChange={e=>setSymptoms(e.target.value)} style={{width:'60%'}}/>
      </div>
      <div>
        <label>Mood</label><br/>
        <input value={mood} onChange={e=>setMood(e.target.value)} style={{width:'60%'}}/>
      </div>
      <button onClick={submit} style={{marginTop:10}}>Submit Check-in</button>
    </div>
  );
}

export default App;
