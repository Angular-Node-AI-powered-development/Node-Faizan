const request = require('supertest');
const app = require('../src/app');

describe('Health API', () => {
  describe('GET /api/health', () => {
    it('returns 200 and status ok with timestamp', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
      expect(typeof res.body.timestamp).toBe('string');
    });
  });

  describe('GET /api/health/ping', () => {
    it('returns 200 and status ok with timestamp', async () => {
      const res = await request(app).get('/api/health/ping');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
});
