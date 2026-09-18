'use strict';

class Security {
  constructor() {
    this.requests = new Map();
    this.windowMs = Number(process.env.SCANCLICK_RATE_WINDOW_MS || 60_000);
    this.maxRequests = Number(process.env.SCANCLICK_RATE_LIMIT || 60);
  }

  checkAccess(apiKey) {
    const now = Date.now();
    const current = this.requests.get(apiKey) || { started: now, count: 0 };
    if (now - current.started >= this.windowMs) {
      current.started = now;
      current.count = 0;
    }
    current.count += 1;
    this.requests.set(apiKey, current);
    return { ok: current.count <= this.maxRequests, remaining: Math.max(0, this.maxRequests - current.count) };
  }
}

module.exports = Security;
