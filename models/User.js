const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address."],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
})

const User = model("user", UserSchema);

module.exports = User;