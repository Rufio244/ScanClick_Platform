'use strict';

module.exports = function billingHandler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  return res.status(200).json({
    object: 'billing',
    plan: process.env.SCANCLICK_PLAN || 'basic',
    currency: 'THB',
    configured: Boolean(process.env.BILLING_PROVIDER)
  });
};
