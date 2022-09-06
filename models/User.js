const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create a schema for User
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            required: 'Email is required',
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create a virtual for total count of friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;