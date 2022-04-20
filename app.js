var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var courses = require('./models/courses');
var sessions = require('./models/sessions');
var cors = require('cors');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/courses/:courseId', async function (req, res) {
  var { courseId } = req.params;
  try {
    res.status(200).json({
      success: true,
      payload: await courses.getCourse(req.headers['x-user-id'], courseId),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/courses/:courseId/sessions/:sessionId', async function (req, res) {
  var { courseId, sessionId } = req.params;
  try {
    res.status(200).json({
      success: true,
      payload: await sessions.getSession(
        sessionId,
        req.headers['x-user-id'],
        courseId
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/courses/:courseId', async function (req, res) {
  var { courseId } = req.params;
  try {
    res.status(201).json({
      success: true,
      payload: await sessions.postSession(
        req.headers['x-user-id'],
        courseId,
        req.body
      ),
      message: `Created post for user with ID: ${req.headers['x-user-id']}
      and course with ID ${courseId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = app;
