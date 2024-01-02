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
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
        
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that id" });
            }
        
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}