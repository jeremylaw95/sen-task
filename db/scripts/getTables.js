const { query } = require('../dbSetup');

async function getUsers() {
  var data = await query(`select * from users ;`);
  return data.rows;
}
async function getCourses() {
  var data = await query(`select * from courses ;`);
  return data.rows;
}
async function getSessions() {
  var data = await query(`select * from sessions ;`);
  return data.rows;
}

async function getAllTables() {
  var userData = await getUsers();
  var courseData = await getCourses();
  var sessionData = await getSessions();
  console.log('userData:');
  console.log(userData);
  console.log('courseData:');
  console.log(courseData);
  console.log('sessionData:');
  console.log(sessionData);
}

module.exports = { getAllTables };

if (require.main === module) {
  getAllTables();
}
