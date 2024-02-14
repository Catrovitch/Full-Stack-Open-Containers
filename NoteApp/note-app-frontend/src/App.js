import React, { useState, useEffect } from 'react';
import './App.css';
import notesService from './services/notes'; // Import notesService

function App() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Fetch notes from the backend when the component mounts
    const fetchNotes = async () => {
      try {
        const notes = await notesService.getAll(); // Use notesService to fetch notes
        setNotes(notes); // Update the notes state with the data received from the backend
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes(); // Call the fetchNotes function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNote = async () => {
    if (inputValue.trim() !== '') {
      try {
        const newNote = { text: inputValue };
        const addedNote = await notesService.create(newNote); // Use notesService to add a new note
        setNotes([...notes, addedNote]); // Update the notes state with the new note received from the backend
        setInputValue('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleDeleteNote = async (index) => {
    try {
      await notesService.deleteNote(notes[index]._id); // Use notesService to delete the note
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your note"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={note._id}>
            {note.text}
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
