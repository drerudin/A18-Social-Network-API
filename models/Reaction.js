// model for Reactions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        // createdAt with date, defaults to current timestamp and uses getter method to format timestamp on query
        createdAt: { type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal) }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// create the Reaction model using the ReactionSchema
const Reaction = mongoose.model('Reaction', reactionSchema);

// export the Reaction model
module.exports = Reaction;