// chatRoutes.js

const express = require('express');
const { getChatResponse } = require('../services/openai/openaiService');

const router = express.Router();

router.post('/advice', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Please provide a valid array of messages.' });
  }

  try {
    const response = await getChatResponse(messages);
    res.json({ response });
  } catch (error) {
    console.error('Failed to get chat response:', error);
    console.error('Error object:', error);
    res.status(500).json({ error: 'Failed to get chat response.' });
  }
});

module.exports = router;
