const router = require('express').Router();
// grab all the api routes from the api folder
const apiRoutes = require('./api');

// prefix all of the api routes with /api
router.use('/api', apiRoutes);

// error handling
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;