// mongoose seeds for Thought and User models

// import the Thought and User models
const { Thought, User } = require('../models');

// create the thought data
const thoughtData = [
  {
    thoughtText: 'You only live once, but if you do it right, once is enough.',
    username: 'Mae West',
    createdAt: new Date(),
    reactions: [],
  },
  {
    thoughtText: 'Many of life’s failures are people who did not realize how close they were to success when they gave up.',
    username: 'Thomas A. Edison',
    createdAt: new Date(),
    reactions: [],
  },
  {
    thoughtText: 'If you want to live a happy life, tie it to a goal, not to people or things.',
    username: 'Albert Einstein',
    createdAt: new Date(),
    reactions: [],
  },
];

// create the user data
const userData = [
  {
    username: 'Mae West',
    email: 'mae@west.com',
    thoughts: [],
    friends: [],
    },
    {
    username: 'Thomas A. Edison',
    email: 'tom@edison.com',
    thoughts: [],
    friends: [],
    },
    {
    username: 'Albert Einstein',
    email: 'al@stein.com',
    thoughts: [],
    friends: [],
    },
];

// create reactions
const reactionData = [
    {
      reactionId: thoughtData[0]._id,
      reactionBody: 'I agree!',
      username: 'Thomas A. Edison',
      createdAt: new Date(),
    },
    {
      reactionId: thoughtData[0]._id,
      reactionBody: 'I agree!',
      username: 'Albert Einstein',
      createdAt: new Date(),
    },
    {
      reactionId: thoughtData[1]._id,
      reactionBody: 'I agree!',
      username: 'Mae West',
      createdAt: new Date(),
    },
    {
      reactionId: thoughtData[1]._id,
      reactionBody: 'I agree!',
      username: 'Albert Einstein',
      createdAt: new Date(),
    },
    {
      reactionId: thoughtData[2]._id,
      reactionBody: 'I agree!',
      username: 'Mae West',
      createdAt: new Date(),
    },
    {
      reactionId: thoughtData[2]._id,
      reactionBody: 'I agree!',
      username: 'Thomas A. Edison',
      createdAt: new Date(),
    },
  ];

  // create friend data
const friendData = [
    {
        username: 'Mae West',
        friends: ['Thomas A. Edison', 'Albert Einstein'],
    },
    {
        username: 'Thomas A. Edison',
        friends: ['Mae West', 'Albert Einstein'],
    },
    {
        username: 'Albert Einstein',
        friends: ['Mae West', 'Thomas A. Edison'],
    },
];

// create a function to seed the database
const seedDatabase = async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = await User.collection.insertMany(userData);
    const thoughts = await Thought.collection.insertMany(thoughtData);
    const reactions = await Reaction.collection.insertMany(reactionData);
    const friends = await Friend.collection.insertMany(friendData);

    process.exit(0);
};

seedDatabase();