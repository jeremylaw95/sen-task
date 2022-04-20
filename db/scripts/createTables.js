const { query } = require('../dbSetup');

async function createUsersTable() {
  let res = await query(`CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE,
    PRIMARY KEY (id))`);
  console.log(res);
}

async function createCoursesTable() {
  let res = await query(`CREATE TABLE IF NOT EXISTS courses (
      id UUID NOT NULL UNIQUE,
      PRIMARY KEY (id)
  )`);
  console.log(res);
}

async function createSessionsTable() {
  let res = await query(`CREATE TABLE sessions (
      id UUID NOT NULL UNIQUE,
      user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      course_id UUID NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
      total_modules_studied INTEGER NOT NULL,
      average_score INTEGER NOT NULL,
      time_studied INTEGER NOT NULL,
      PRIMARY KEY (id)
  )`);
  console.log(res);
}

const createAllTables = async () => {
  await createUsersTable();
  console.log('users created');
  await createCoursesTable();
  console.log('courses created');
  await createSessionsTable();
  console.log('sessions created');
};

module.exports = { createAllTables };

// The code inside if block shouldn't run if we're requiring this file somewhere.
if (require.main === module) {
  createAllTables();
}
