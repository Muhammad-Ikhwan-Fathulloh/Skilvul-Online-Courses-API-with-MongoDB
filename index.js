// index.js

// Importing needed Packeges
const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/TaskController');
const Instructors = require("./controllers/Instructors")
const Courses = require("./controllers/Courses")
const Participants = require("./controllers/Participants")

// db instance connection
require('./config/db');

const app = express();

// Defining the port for Environment
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const ready = {
        status: "Welcome to Ikhwan Courses",
    }

    res.status(200).send(ready)
})

// API Instructor Endpoints
app
  .route('/instructors')
  .get(Instructors.listAllInstructor)
  .post(Instructors.createNewInstructor);

app
  .route('/instructors/:instructorid')
  .get(Instructors.readInstructor)
  .put(Instructors.updateInstructor)
  .delete(Instructors.deleteInstructor);

// API Courses Endpoints
app
  .route('/courses')
  .get(Courses.listAllCourses)
  .post(Courses.createNewCourses);

app
  .route('/courses/:coursesid')
  .get(Courses.readCourses)
  .put(Courses.updateCourses)
  .delete(Courses.deleteCourses);

// API Participant Endpoints
app
  .route('/participants')
  .get(Participants.listAllParticipant)
  .post(Participants.createNewParticipant);

app
  .route('/participants/:participantid')
  .get(Participants.readParticipant)
  .put(Participants.updateParticipant)
  .delete(Participants.deleteParticipant);

// Console the app is listening success message with port present
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
