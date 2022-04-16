const { query } = require('../db/index');

async function getCourseById(userId, courseId) {
  const response = await query(
    `
  SELECT total_modules_studied, average_score, time_studied FROM courses where user_id = $1 and id = $2;`,
    [userId, courseId]
  );
  return response.rows;
}

module.exports = {
  getCourseById,
};
