const request = require('supertest')
const app = require('../server')

describe('Test server routes', () => {
    it('should respond with status 200 for GET /', async () => {
      const response = await request(app).get('/user');
      expect(response.status).toBe(200);
    });
  
    it('should respond with status 200 for POST /user/login', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const response = await request(app).post('/user/login').send(credentials);
      expect(response.status).toBe(200);
    });
  });