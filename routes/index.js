const router = require('express').Router();
const notesRouter = require('./notes');

// Define your routes

router.use('/notes', notesRouter);

module.exports = router;
