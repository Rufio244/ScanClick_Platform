'use strict';

class AIEngine {
  async process(input) {
    const text = typeof input === 'string' ? input.trim() : '';
    if (!text) return { answer: 'กรุณาส่งข้อความที่ต้องการประมวลผล' };

    // Local, deterministic fallback. Replace this adapter with a real model
    // provider only through environment variables; never hard-code credentials.
    return {
      answer: `ได้รับข้อความแล้ว: ${text}`,
      model: process.env.AI_MODEL || 'scanclick-local',
      provider: 'local'
    };
  }
}

module.exports = AIEngine;
