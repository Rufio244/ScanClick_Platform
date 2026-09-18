'use strict';

module.exports = function keysHandler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  return res.status(200).json({ object: 'list', data: [], note: 'Keys are never returned by the API.' });
};
