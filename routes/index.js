const express = require("express")
const bodyParser = require('body-parser');
const author = "Muhammad Ikhwan Fathulloh"
// creates a new router instance.
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    const ready = {
        status: `server is ready, ${author}`
    }

    res.status(200).send(ready)
})

// API Instructor Endpoints
router
  .route('/instructors')
  .get(Instructors.listAllInstructor)
  .post(Instructors.createNewInstructor);

router
  .route('/instructors/:instructorid')
  .get(Instructors.readInstructor)
  .put(Instructors.updateInstructor)
  .delete(Instructors.deleteInstructor);

// API Courses Endpoints
router
  .route('/courses')
  .get(Courses.listAllCourses)
  .post(Courses.createNewCourses);

router
  .route('/courses/:coursesid')
  .get(Courses.readCourses)
  .put(Courses.updateCourses)
  .delete(Courses.deleteCourses);

// API Participant Endpoints
router
  .route('/participants')
  .get(Participants.listAllParticipant)
  .post(Participants.createNewParticipant);

router
  .route('/participants/:participantid')
  .get(Participants.readParticipant)
  .put(Participants.updateParticipant)
  .delete(Participants.deleteParticipant);

module.exports = router