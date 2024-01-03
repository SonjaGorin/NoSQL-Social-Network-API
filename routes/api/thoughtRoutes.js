const router = require("express").Router();

const {
    getAllThoughts,
    getSingleThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts);

router.route("/:id").get(getSingleThought);