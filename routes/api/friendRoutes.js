const router = require("express").Router();

const {
    addFriend,
    // deleteFriend
} = require("../../controllers/friendController");

router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;