const { query } = require('../db/dbSetup');

async function getCourse(userId, courseId) {
  const response = await query(
    ` SELECT sum_of_score_times_modules/total_modules_studied as average_score,
   total_modules_studied,
  time_studied 
    FROM (
    SELECT  
    SUM(average_score*total_modules_studied) as sum_of_score_times_modules, 
    SUM(total_modules_studied) as total_modules_studied, 
    SUM(time_studied) as time_studied,
    user_id, 
    course_id
    FROM sessions
    where user_id = $1 and course_id = $2 
    group by user_id, course_id
    ) as s2
    ;`,
    [userId, courseId]
  );
  return response.rows;
}

module.exports = {
  getCourse,
};
