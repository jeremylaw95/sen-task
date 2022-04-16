const { query } = require('../index.js');

async function createUsersTable() {
  let res = await query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
)`);
  console.log(res);
}

async function createCoursesTable() {
  let res = await query(`CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      total_modules_studied INTEGER NOT NULL,
      average_score INTEGER NOT NULL,
      time_studied INTEGER NOT NULL
  )`);
  console.log(res);
}

async function createSessionsTable() {
  let res = await query(`CREATE TABLE sessions (
      id SERIAL PRIMARY KEY NOT NULL,
      course_id INTEGER NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
      date DATE NOT NULL
  )`);
  console.log(res);
}

const createAllTables = async () => {
  await createUsersTable();
  console.log('users created');
  await createCoursesTable();
  console.log('courses created');
  // await createSessionsTable();
  // console.log('sessions created');
};

module.exports = { createAllTables };

// The code inside if block shouldn't run if we're requiring this file somewhere.
if (require.main === module) {
  createAllTables();
}
