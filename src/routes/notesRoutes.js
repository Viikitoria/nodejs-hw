const express = require('express');
const router = express.Router();
const { getNotes, getNoteById, getTestError } = require('../controllers/notesController');

router.get('/notes', getNotes);
router.get('/notes/:noteId', getNoteById);
router.get('/test-error', getTestError);

module.exports = router;