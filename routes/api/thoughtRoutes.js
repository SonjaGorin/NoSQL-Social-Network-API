const router = require("express").Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getSingleThought).delete(deleteThought);

module.exports = router;