const { User } = require("../models");

module.exports = {
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: "No user found with that id" });
            };
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
        
            if (!user) {
                return res.status(404).json({ message: "No user with that ID" });
            }
        
            res.json({ message: "Friend deleted!" })
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
}