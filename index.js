const { response } = require('express');
const express = require('express');
const app = express();
const port = 8000;
const courses = require('./models/courses');
module.exports = app.listen(3000);
const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost',
  })
);

app.get('/courses/:courseId', async function (req, res) {
  const { courseId } = req.params;

  // if (courseId == 1) {
  //   res.json({ course: 'Maths' });
  // } else {
  //   res.json({ course: 'English' });
  // }

  try {
    res.status(200).json({
      success: true,
      payload: await courses.getCourseById(req.headers['x-user-id'], courseId),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/courses/:courseId/sessions/:sessionId', function (req, res) {
  res.json({ score: 10 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
