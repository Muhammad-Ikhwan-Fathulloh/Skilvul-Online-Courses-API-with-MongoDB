const express = require("express")

const authorize = require("../middleware/auth");
const Participants = require('../controllers/Participants');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(Participants.listAllParticipant)
  .post(Participants.createNewParticipant);

router
  .route('/:participantid')
  .get(Participants.readParticipant)
  .put(Participants.updateParticipant)
  .delete(Participants.deleteParticipant);

module.exports = router