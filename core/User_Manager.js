'use strict';

const crypto = require('crypto');

function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

class UserManager {
  constructor() {
    this.usage = new Map();
    this.apiKey = process.env.SCANCโLICK_API_KEY || process.env.SCANCLICK_API_KEY || '';
  }

  validateKey(candidate) {
    if (!candidate || !this.apiKey || !timingSafeEqual(candidate, this.apiKey)) {
      return { valid: false, reason: 'Invalid API key' };
    }
    return { valid: true, userId: 'default-user', plan: process.env.SCANCLICK_PLAN || 'basic' };
  }

  useToken(userId) {
    const limit = Number(process.env.SCANCLICK_TOKEN_LIMIT || 1000);
    const used = this.usage.get(userId) || 0;
    if (used >= limit) return false;
    this.usage.set(userId, used + 1);
    return true;
  }

  getUsage(userId = 'default-user') {
    return { userId, tokensUsed: this.usage.get(userId) || 0 };
  }
}

module.exports = UserManager;
