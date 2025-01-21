import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Noteslist from './components/Noteslist';
import Search from './components/Search';
import Header from './components/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [editId, setEditId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState({});
    const [darkMode, setDarkMode] = useState(false);
  
    const getNewQuote = () => {
        axios
            .get('https://dummyjson.com/quotes/random')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/notes')
            .then((response) => {
                setNotes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getNewQuote();
    }, []);

    const addNote = (text) => {
        if (!text.trim()) {
            toast.error('Please enter a note before saving!');
            return;
        }

        const date = new Date();
        const showTime = date.getHours() + ':' + date.getMinutes();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
            time: showTime,
            isPinned: false // Initialize isPinned state
        };

        axios
            .post('http://localhost:5000/notes', newNote)
            .then((response) => {
                setNotes([response.data, ...notes]); // Prepend the new note
                toast.success('Note saved successfully!');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Edit an existing note
    const editNote = (id) => {
        const noteToEdit = notes.find((note) => note.id === id);
        setCurrentNote(noteToEdit.text);
        setEditId(id);
    };

    // Update the note on the server
    const updateNote = (text) => {
        if (!text.trim()) {
            toast.error('Please enter a note before updating!');
            return;
        }

        const updatedNote = { text };
        axios
            .put(`http://localhost:5000/notes/${editId}`, updatedNote)
            .then(() => {
                const updatedNotes = notes.map((note) =>
                    note.id === editId ? { ...note, text: updatedNote.text } : note
                );
                setNotes(updatedNotes);
                setCurrentNote('');
                setEditId(null);
                toast.success('Note updated successfully!');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Delete a note
    const deleteNote = (id) => {
        axios
            .delete(`http://localhost:5000/notes/${id}`)
            .then(() => {
                const newNotes = notes.filter((note) => note.id !== id);
                setNotes(newNotes);
                toast.success('Note deleted successfully!');
            })
            .catch((error) => {
                console.log(error);
            });
    };


const handleFillPinNote = (id)=> {
   setNotes((prevNotes) => {
       const noteToPin = prevNotes.map((note, index) => {
           if (note.id === id) // this checks that whteter the current note id = id passed by a function
            {
               return {
                   ...note,
                   isPinned: true,
                   originalIndex: index, // Store the original index when note is pinned
               }; // new note obj with same properties as original note
           }
           return note;
       });

       return noteToPin.sort((a, b) => b.isPinned - a.isPinned); // Sort by pinned status
   });
};

const handleUnPinNote = (id)=> {
   setNotes((prevNotes) => {
       const noteToUnpin = prevNotes.find(note => note.id === id);
    //    if (!noteToUnpin.originalIndex) return prevNotes; // Safety check

       noteToUnpin.isPinned = false; // Mark the note as unpinned

       const filteredNotes = prevNotes.filter(note => note.id !== id); // conatins allnote except unpinned one

       // Reinsert the note at its original index
       return [
           ...filteredNotes.slice(0, noteToUnpin.originalIndex),// all notes from start of fn upto originalindex of note being unpinned
           noteToUnpin, // note that is being unpinned
           ...filteredNotes.slice(noteToUnpin.originalIndex) // all the remaining notes in FN starting from OI of note being unpinned
       ];
   });
};




    return (
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className="container">
                <Header handleToggleDarkMode={setDarkMode} value={setData} />
                <div className="quote-container">
                    <h2 className="h2">Affirmation:</h2>
                    <p>{data.quote}</p>
                    <br />
                    
                    <button onClick={getNewQuote} className="next-quote-btn">Next Quote</button>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                <Search handleSearchNote={setSearchText} />
                
                {editId ? (
                    <div className="edit-note">
                        <input
                            type="text"
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="Edit your note..."
                            className="edit-textarea"
                        />
                        <button onClick={() => updateNote(currentNote)} className="Update-btn">
                            Update
                        </button>
                        <button onClick={() => setEditId(null)} className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <Noteslist
                        notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
                        handleAddNote={addNote}
                        handleEditNote={editNote}
                        handleUpdateNote={updateNote}
                        handleDeleteNote={deleteNote}
                        handleUnPinNote={handleUnPinNote} 
                        handleFillPinNote={handleFillPinNote}
                    />
                )}

            </div>
            <ToastContainer />
        </div>
    );
};

export default App;
