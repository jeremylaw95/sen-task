const { query } = require('../db/dbSetup');

async function getCourse(userId, courseId) {
  const response = await query(
    `SELECT SUM(s.total_modules_studied) as total_modules_studied, SUM(s.sum_of_score_times_modules)/SUM(s.total_modules_studied) as average_score, SUM(time_studied) as time_studied
    FROM (
  SELECT total_modules_studied, SUM(average_score*total_modules_studied) as sum_of_score_times_modules, time_studied, user_id, course_id
  FROM sessions where user_id = $1 and course_id = $2 group by user_id, course_id, total_modules_studied, time_studied
  ) as s
  group by user_id, course_id;`,
    [userId, courseId]
  );
  console.log(response.rows);
  return response.rows;
}

module.exports = {
  getCourse,
};
