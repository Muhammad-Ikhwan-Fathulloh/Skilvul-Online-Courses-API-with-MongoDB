// Import Model InstructorModel
const Instructor = require('../models/InstructorModel');

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

class InstructorAPI {

  // Baca semua data
  static async listAllInstructor(req, res) {
    Instructor.find({}, (err, Instructor) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : Instructor
          }
      });
    });
  };

  // Tambah data dengan validasi
  static async createNewInstructor(req, res) {
    let newInstructor = new Instructor(req.body);
    newInstructor.save((err, Instructor) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : newInstructor
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readInstructor(req, res) {
    Instructor.findById(req.params.instructorid, (err, Instructor) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Instructor by Id",
          time: Timestamp,
        },
          data: {
            Instructor : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get Instructor by Id",
          time: Timestamp,
        },
          data: {
            Instructor : Instructor
          }
      });
    });
  };

  // Ubah data berdasarkan id
  static async updateInstructor(req, res) {
    Instructor.findOneAndUpdate(
      { _id: req.params.instructorid },
      req.body,
      { new: true },
      (err, Instructor) => {
        if (err) {
          res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : err
          }
      });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : Instructor
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteInstructor(req, res) {
    Instructor.findByIdAndRemove({ _id: req.params.instructorid }, (err, Instructor) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete Instructor",
          time: Timestamp,
        },
          data: {
            Instructor : Instructor
          }
      });
    });
  };
}

module.exports = InstructorAPI
