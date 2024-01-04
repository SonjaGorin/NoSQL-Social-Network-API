const { Thought, User } = require("../models");

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
        
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that id" });
            }
        
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                {$push: {thoughts: dbThoughtData._id }},
                { new: true }
            );
            console.log("1")

            if (!user) {
                return res.status(404).json({
                    message: "Thought created, but found no user with that id",
                });
            }
            console.log("2")
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
}