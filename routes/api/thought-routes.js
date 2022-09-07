// thoughts api

const express = require('express');
const router = express.Router();
const { User, Thought } = require('../../models');

// get all thoughts
router.get('/', (req, res) => {
    Thought.find({})
        .select('-__v')
        .sort({ createdAt: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// get one thought by id
router.get('/:id', (req, res) => {
    Thought.findOne({ _id: req.params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// create thought by user id
router.post('/:userId', (req, res) => {
    Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
});

// update thought by id
router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
});

// delete thought by id
router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            return User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
});

// create reaction
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
});

// get all reactions
router.get('/:thoughtId/reactions', (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete reaction by id
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
});


module.exports = router;
