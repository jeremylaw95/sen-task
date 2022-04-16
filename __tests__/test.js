const app = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

describe('User Endpoints', () => {
  it('GET /courses/:courseId/ should show user stats for a course', async () => {
    const res = await requestWithSupertest.get('/courses/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('GET /courses/:courseId/sessions/:sessionId should user stats for a course', async () => {
    const res = await requestWithSupertest.get('/courses/1/sessions/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });
});
