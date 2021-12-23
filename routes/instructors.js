const express = require("express")

const authorize = require("../middleware/auth");
const Instructors = require('../controllers/Instructors');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(Instructors.listAllInstructor)
  .post(Instructors.createNewInstructor);

router
  .route('/:instructorid')
  .get(Instructors.readInstructor)
  .put(Instructors.updateInstructor)
  .delete(Instructors.deleteInstructor);

module.exports = router