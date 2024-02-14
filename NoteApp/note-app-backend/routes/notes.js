const express = require('express');
const router = express.Router();
const Note = require('../mongo/models/Note');

// Get all notes
router.get('/', async (req, res) => {
  console.log('getting notes...')
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  console.log('adding note...')
  const { text } = req.body;
  try {
    const note = new Note({ text });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
  console.log('deleting notes...')
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

