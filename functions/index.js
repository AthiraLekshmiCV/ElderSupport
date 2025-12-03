const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });


admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// mount agents (handlers)
app.post('/triageAgent', require('./agents/triageAgent'));
app.post('/safetyAgent', require('./agents/safetyAgent'));
app.post('/medicationAgent', require('./agents/medicationAgent'));
app.post('/communicationAgent', require('./agents/communicationAgent'));
app.post('/utilityAgent', require('./agents/utilityAgent'));

app.get('/', (req, res) => res.send('Elderly Support API'));

exports.api = functions.https.onRequest(app);

