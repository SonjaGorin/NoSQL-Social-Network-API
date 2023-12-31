const router = require("express").Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getSingleThought).delete(deleteThought).put(updateThought);

module.exports = router;