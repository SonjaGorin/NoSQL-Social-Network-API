const { Thought, User } = require("../models");

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get one thought using thought id
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

    // create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: "Thought created, but found no user with that id",
                });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },

    // update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with that id" });
            };

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        
            if (!thought) {
                return res.status(404).json({ message: "No thought with that ID" });
            }

            // remove thought is from user.thoughts array
            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: {thoughts: req.params.id} },
                { runValidators: true, new: true }
            )
        
            res.json({ message: "Thought deleted!" })
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
}