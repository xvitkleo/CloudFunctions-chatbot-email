const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
const cors = require('cors');
manager.load();
const { sendNotification } = require('./emails/account');

const express = require('express');
const app = express();
app.use(cors());

app.get('/message', cors(), async (req, res) => {
  const response = await manager.process('en', req.query.message);
  res.send({ answer: response.answer });
});

exports.notification = async (req, res) => {
  sendNotification();
  res.send(200);
};

exports.chatbot = app;
