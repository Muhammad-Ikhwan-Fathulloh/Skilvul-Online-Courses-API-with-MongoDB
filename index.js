const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors");

const openDBConnection = require("./helpers/db")

const port = process.env.PORT || 3001
const uri = process.env.MONGO_URI || "mongodb+srv://dolannation:dolan170845@cluster0.bqtzb.mongodb.net/dolannation?retryWrites=true&w=majority"

// const dbOptions = {
//     user: process.env.MONGO_USER,
//     pass: process.env.MONGO_PASS
// }

async function main() {
    try {
        // mastikan database connect, baru kita jalankan app.
        await openDBConnection(uri)

        const app = express()

        //memastikan cors berjalan dengan baik
        var corsOptions = {
          origin: `http://localhost:${port}`
        };

        //cek cors
        app.use(cors(corsOptions));

        app.use(express.json()) // biar kita bisa ambil request body.

        // parsing requests data menjadi content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));

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

        app.listen(port, () => {
            console.log("server is listening on port", port)
        })
        
    } catch (error) {
        console.log("main:", error)
    }
}

main() // menjalankan main.

