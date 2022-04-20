const { query } = require('../dbSetup');
const { v4: uuidv4 } = require('uuid');

var userId = uuidv4();
var courseId = uuidv4();
var sessionId;

const session1 = {
  totalModulesStudied: 5,
  averageScore: 100,
  timeStudied: 50000000,
};
const session2 = {
  totalModulesStudied: 10,
  averageScore: 50,
  timeStudied: 50000000,
};

async function populateUsersTable() {
  await query(
    `INSERT INTO users(
      id
      ) VALUES ($1) RETURNING *;`,
    [userId]
  );
}

async function populateCoursesTable() {
  await query(
    `INSERT INTO courses(
          id
        ) VALUES ($1) RETURNING *;`,
    [courseId]
  );
}
async function populateSessionsTable(session) {
  sessionId = uuidv4();
  await query(
    `INSERT INTO sessions(
          id,
          user_id,
          course_id,
          total_modules_studied,
          average_score,
          time_studied
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      sessionId,
      userId,
      courseId,
      session.totalModulesStudied,
      session.averageScore,
      session.timeStudied,
    ]
  );
  return sessionId;
}

async function populateAllTables() {
  await populateUsersTable();
  await populateCoursesTable();
  await populateSessionsTable(session1);
  await populateSessionsTable(session2);
  console.log('Tables should be populated now.');
}

module.exports = { populateAllTables, userId, sessionId, courseId };

if (require.main === module) {
  populateAllTables();
}
