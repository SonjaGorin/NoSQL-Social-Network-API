const { Thought } = require("../models");

module.exports = {
    // create reaction to user's thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with that id" });
            };

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
        
            if (!thought) {
                return res.status(404).json({ message: "No thought with that ID" });
            }
        
            res.json({ message: "Reaction deleted!" })
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
}