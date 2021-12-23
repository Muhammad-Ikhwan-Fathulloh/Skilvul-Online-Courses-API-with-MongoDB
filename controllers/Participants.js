// Import Model ParticipantModel
const Participant = require('../models/ParticipantModel');

let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();

let Timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

class ParticipantAPI {

  // Baca semua data
  static async listAllParticipant(req, res) {
    Participant.find({}, (err, Participant) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Participant",
          time: Timestamp,
        },
          data: {
            Participant : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All Participant",
          time: Timestamp,
        },
          data: {
            Participant : Participant
          }
      });
    }).populate("instructors");
  };

  // Tambah data dengan validasi
  static async createNewParticipant(req, res) {
    let newParticipant = new Participant(req.body);
    newParticipant.save((err, Participant) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Participant",
          time: Timestamp,
        },
          data: {
            Participant : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post Participant",
          time: Timestamp,
        },
          data: {
            Participant : newParticipant
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readParticipant(req, res) {
    Participant.findById(req.params.participantid, (err, Participant) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Participant by Id",
          time: Timestamp,
        },
          data: {
            Participant : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get Participant by Id",
          time: Timestamp,
        },
          data: {
            Participant : Participant
          }
      });
    }).populate("instructors");
  };

  // Ubah data berdasarkan id
  static async updateParticipant(req, res) {
    Participant.findOneAndUpdate(
      { _id: req.params.participantid },
      req.body,
      { new: true },
      (err, Participant) => {
        if (err) {
          res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated Participant",
          time: Timestamp,
        },
          data: {
            Participant : err
          }
      });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Participant",
          time: Timestamp,
        },
          data: {
            Participant : Participant
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteParticipant(req, res) {
    Participant.findByIdAndRemove({ _id: req.params.participantid }, (err, Participant) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete Participant",
          time: Timestamp,
        },
          data: {
            Participant : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete Participant",
          time: Timestamp,
        },
          data: {
            Participant : Participant
          }
      });
    });
  };
}

module.exports = ParticipantAPI
