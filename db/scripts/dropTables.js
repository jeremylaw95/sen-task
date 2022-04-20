const { query } = require('../dbSetup');

async function dropUsersTable() {
  return await query('DROP TABLE IF EXISTS users cascade;');
}

async function dropCoursesTable() {
  return await query('DROP TABLE IF EXISTS courses cascade;');
}

async function dropSessionsTable() {
  return await query('DROP TABLE IF EXISTS sessions cascade;');
}

async function dropAllTables() {
  await dropUsersTable(); // drop this last as the others refer to it?
  await dropCoursesTable();
  await dropSessionsTable();
  console.log('Tables should be deleted now.');
}

module.exports = { dropAllTables };

if (require.main === module) {
  dropAllTables();
}
