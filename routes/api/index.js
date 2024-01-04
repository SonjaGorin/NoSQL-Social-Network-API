const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
const friendRoutes = require("./friendRoutes");
const reactionRoutes = require("./reactionRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/thoughts", reactionRoutes);
router.use("/users", userRoutes);
router.use("/users", friendRoutes);

module.exports = router;