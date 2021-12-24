// Import Model CoursesModel
const Courses = require('../models/CoursesModel');

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

class CoursesAPI {

  // Baca semua data
  static async listAllCourses(req, res) {
    Courses.find({}, (err, Courses) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Courses",
          time: Timestamp,
        },
          data: {
            Courses : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All Courses",
          time: Timestamp,
        },
          data: {
            Courses : Courses
          }
      });
    }).populate("instructor");
  };

  // Tambah data dengan validasi
  static async createNewCourses(req, res) {
    let newCourses = new Courses(req.body);
    newCourses.save((err, Courses) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Courses",
          time: Timestamp,
        },
          data: {
            Courses : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post Courses",
          time: Timestamp,
        },
          data: {
            Courses : newCourses
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readCourses(req, res) {
    Courses.findById(req.params.coursesid, (err, Courses) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Courses by Id",
          time: Timestamp,
        },
          data: {
            Courses : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get Courses by Id",
          time: Timestamp,
        },
          data: {
            Courses : Courses
          }
      });
    }).populate("instructor");
  };

  // Ubah data berdasarkan id
  static async updateCourses(req, res) {
    Courses.findOneAndUpdate(
      { _id: req.params.coursesid },
      req.body,
      { new: true },
      (err, Courses) => {
        if (err) {
          res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated Courses",
          time: Timestamp,
        },
          data: {
            Courses : err
          }
      });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Courses",
          time: Timestamp,
        },
          data: {
            Courses : Courses
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteCourses(req, res) {
    Courses.findByIdAndRemove({ _id: req.params.coursesid }, (err, Courses) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete Courses",
          time: Timestamp,
        },
          data: {
            Courses : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete Courses",
          time: Timestamp,
        },
          data: {
            Courses : Courses
          }
      });
    });
  };
}

module.exports = CoursesAPI
