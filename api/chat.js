'use strict';

const AIEngine = require('../core/AI_Engine');
const ai = new AIEngine();

module.exports = async function chatHandler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const body = req.body || {};
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const last = messages[messages.length - 1];
  if (!last || typeof last.content !== 'string' || !last.content.trim()) {
    return res.status(400).json({ error: 'messages must contain a non-empty content value' });
  }
  const result = await ai.process(last.content);
  return res.status(200).json({
    id: `chatcmpl-${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: result.model || 'scanclick-local',
    choices: [{ index: 0, message: { role: 'assistant', content: result.answer }, finish_reason: 'stop' }],
    usage: { prompt_tokens: messages.length, completion_tokens: 1, total_tokens: messages.length + 1 }
  });
};
