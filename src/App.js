import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/Noteslist'
import Search from './components/Search';
import Header from './components/Header';
import axios from 'axios';



const App = () => {
	
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		
	]);

	const[currentNote, setCurrentNote] = useState('');
	const [editId,setEditId] = useState(null);
	const [searchText, setSearchText] = useState('');

	const [data,setData]= useState([]);

	useEffect(() => {
		axios.get('https://dummyjson.com/quotes/random')
		  .then(response => {
			setData(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }, []);
	
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const editNote = (id) => {
		const editNotes = notes.find((note)=>note.id===id);
		setCurrentNote(editNotes.text);
		setEditId(id);
	};

	const updateNote = (text) => {
		const updatedNotes = notes.map((note) =>
			note.id === editId ? { ...note, text: text } : note
		);
		setNotes(updatedNotes);
		setCurrentNote('');
		setEditId(null);
	};



	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
		  <div className='container'>
			<Header handleToggleDarkMode={setDarkMode} value={setData} />
			<div className='quote-container'>
			  <h2 className='h2'>Affirmation:</h2>
			  <p>{data.quote}</p>
			</div>
	  
			<Search handleSearchNote={setSearchText} />
			
			{editId ? (
			  <div className="edit-note">
				<input
				  type="text"
				  value={currentNote}
				  onChange={(e) => setCurrentNote(e.target.value)}
				  placeholder="Edit your note..."
				  className='edit-textarea'
				/>
				<br/>
				<br/>
				<button onClick={() => updateNote(currentNote)} className='Update-btn'>Update</button>
				<button onClick={() => setEditId(null)}className='cancel-btn'>Cancel</button>
			  </div>
			) : (
			  <NotesList
				notes={notes.filter((note) =>
				  note.text.toLowerCase().includes(searchText)
				)}
				handleAddNote={addNote}
				handleEditNote={editNote}
				handleUpdateNote={updateNote}
				handleDeleteNote={deleteNote}
			  />
			)}
		  </div>
		</div>
	  );
	};

export default App;