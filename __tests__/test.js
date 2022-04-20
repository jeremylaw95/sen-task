const app = require('../app.js');
const supertest = require('supertest');
var request = supertest(app);
var courseId = 'c2bc134c-c577-42bd-b9bd-1b4686ce7491';
var sessionId = '19716f91-21a1-4a40-828c-37c106788387';
var userId = '43c8adfb-ec0d-4db5-93d9-831d4acce063';
const { v4: uuidv4 } = require('uuid');

describe('User Endpoints', () => {
  it('GET /courses/:courseId/ should show user stats for a course', async () => {
    const res = await request
      .get('/courses/' + courseId)
      .set('x-user-id', userId);
    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(typeof res.body.payload[0].total_modules_studied).toEqual('string');
    expect(typeof res.body.payload[0].average_score).toEqual('string');
    expect(typeof res.body.payload[0].time_studied).toEqual('string');
    // test average score comes as percentage
    expect(0 <= res.body.payload[0].average_score).toBe(true);
    expect(0 <= res.body.payload[0].average_score <= 100).toBe(true);
  });

  it('POST /courses/:courseId/ should create a new session', async () => {
    const newSession = {
      sessionId: uuidv4(),
      totalModulesStudied: '1',
      averageScore: '50',
      timeStudied: '10000000',
    };
    const res = await request
      .post('/courses/' + courseId)
      .send(newSession)
      .set('x-user-id', userId);
    expect(res.status).toBe(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(
      res.body.message.includes(
        'Created post for user with ID: 43c8adfb-ec0d-4db5-93d9-831d4acce063'
      )
    ).toEqual(true);
    expect(
      res.body.message.includes(
        'and course with ID c2bc134c-c577-42bd-b9bd-1b4686ce7491'
      )
    ).toEqual(true);
  });

  it('GET /courses/:courseId/sessions/:sessionId should user stats for a course', async () => {
    const res = await request
      .get('/courses/' + courseId + '/sessions/' + sessionId)
      .set('x-user-id', userId);
    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(typeof res.body.payload[0].total_modules_studied).toEqual('number');
    expect(typeof res.body.payload[0].average_score).toEqual('number');
    expect(typeof res.body.payload[0].time_studied).toEqual('number');
  });

  // it('GET /courses/:courseId/sessions/:sessionId should user stats for a course', async (done) => {
  //   const res = await request.get('/courses/1/sessions/1');
  //   expect(res.status).toEqual(200);
  //   expect(res.type).toEqual(expect.stringContaining('json'));
  //   done();
  // });
});
