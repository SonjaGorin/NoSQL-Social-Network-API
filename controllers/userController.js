const { User, Thought } = require("../models");

module.exports = {
    async getAllUsers(req, res) {
        try {
            const user = await User.find()
            .select('-__v')
            res.json(user);
        } catch (err) {
            res.status(500).json(err);20
            .toExponential
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .populate("thoughts")
            .populate("friends")
            .select('-__v');
        
            if (!user) {
                return res.status(404).json({ message: "No user found with that id" });
            }
        
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "No user found with that id" });
            };

            for (let thoughtId of user.thoughts) {
                await Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    { $set: {username: user.username} },
                    { runValidators: true, new: true }
                )
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
        
            if (!user) {
                return res.status(404).json({ message: "No user with that ID" });
            }
        
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User and associated thoughts deleted!" })
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
}                                                         