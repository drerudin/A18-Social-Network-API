// model using mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
        email: { type: String, required: true, unique: true, validate: /^\S+@\S+\.\S+$/ },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
);