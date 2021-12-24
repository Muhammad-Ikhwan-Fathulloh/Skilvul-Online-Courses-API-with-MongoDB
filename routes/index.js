const express = require("express")
const bodyParser = require('body-parser');
const userRoutes = require("./users")
const user_groupRoutes = require("./user_groups")
const instructorRoutes = require("./instructors")
const coursesRoutes = require("./courses")
const participantsRoutes = require("./participants")
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

router.use("/users", userRoutes)
router.use("/user-groups", user_groupRoutes)
router.use("/instructors", instructorRoutes)
router.use("/courses", coursesRoutes)
router.use("/participants", participantsRoutes)

module.exports = router