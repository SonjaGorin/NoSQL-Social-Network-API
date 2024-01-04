const router = require("express").Router();

const {
    createReaction,
} = require("../../controllers/reactionController");

router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;