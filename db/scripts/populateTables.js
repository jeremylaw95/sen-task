const { query } = require('../index');

const { initialUser, initialCourse, initialSession } = require('./seedData');

async function populateUsersTable() {
  await query(
    `INSERT INTO users(
        name
      ) VALUES ($1) RETURNING *;`,
    [initialUser.name]
  );
}

async function populateCoursesTable() {
  await query(
    `INSERT INTO courses(
          user_id,
          total_modules_studied,
          average_score,
          time_studied
        ) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [
      initialCourse.userId,
      initialCourse.totalModulesStudied,
      initialCourse.averageScore,
      initialCourse.timeStudied,
    ]
  );
}

async function populateAllTables() {
  await populateUsersTable();
  await populateCoursesTable();
  console.log('Tables should be populated now.');
}

module.exports = { populateAllTables };

if (require.main === module) {
  populateAllTables();
}
