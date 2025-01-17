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
    const [inputFile, setInputFile] = useState('');
    const [filePreview, setFilePreview] = useState('');

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

        const handleUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                setInputFile(file);
                setFilePreview(URL.createObjectURL(file));
            }
        };

        const date = new Date();
        const showTime = date.getHours() + ':' + date.getMinutes();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
            time: showTime,
            handleUpload: handleUpload(inputFile),
        };

        axios
            .post('http://localhost:5000/notes', newNote)
            .then((response) => {
                setNotes([...notes, response.data]);
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
                    />
                )}

                {filePreview && (
                    <div className="file-preview">
                        <h3>File Preview:</h3>
                        <img src={filePreview} alt="File Preview" className='preview-img' />
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default App;
