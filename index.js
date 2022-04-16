const { response } = require('express');
const express = require('express');
const app = express();
const port = 8000;
module.exports = app.listen(3000);

app.get('/courses/:courseId', function (req, res) {
  const { courseId } = req.params;

  if (courseId == 1) {
    res.json({ course: 'Maths' });
  } else {
    res.json({ course: 'English' });
  }

  // const { courseId } = req.params;
  //  model.findCourse(courseId).then(user=>{
  //      res.status(200).json({ course });
  //  }).catch(error=>{
  //      console.log(error)
  //      req.status(500).send(error)
  //  })
});

app.get('/courses/:courseId/sessions/:sessionId', function (req, res) {
  res.json({ score: 10 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
