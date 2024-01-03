const router = require("express").Router();

const {
    getAllUsers,
    getSingleUser,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser);