const express = require('express');
const router = express.Router();

const { getNotes, getNote, addNote, updateNote, deleteNote } = require('../controllers/notes');
const { errorMiddleware } = require('../middlewares/error');

router.get('/', getNotes, errorMiddleware);
router.post('/add', addNote);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
