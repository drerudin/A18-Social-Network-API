// model using mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    }
);

// create a virtual for total count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;