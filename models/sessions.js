const { query } = require('../db/dbSetup');
const { v4: uuidv4 } = require('uuid');

async function getSession(sessionId, userId, courseId) {
  const response = await query(
    `SELECT total_modules_studied, average_score, time_studied FROM sessions where id = $1 and user_id = $2 and course_id = $3;`,
    [sessionId, userId, courseId]
  );
  return response.rows;
}

async function postSession(userId, courseId, statsDiff) {
  const response = await query(
    `INSERT INTO SESSIONS (id, user_id, course_id, total_modules_studied, average_score, time_studied)
    VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      statsDiff.sessionId,
      userId,
      courseId,
      statsDiff.totalModulesStudied,
      statsDiff.averageScore,
      statsDiff.timeStudied,
    ]
  );
  return response.rows;
}

module.exports = {
  getSession,
  postSession,
};
