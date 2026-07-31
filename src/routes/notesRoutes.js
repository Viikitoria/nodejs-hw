import express from 'express';
import { getNotes, getNoteById, getTestError } from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:noteId', getNoteById);
router.get('/test-error', getTestError);

export default router;